import { ApolloServer } from "apollo-server-micro";
import Cors from "cors";
import DataLoader from "dataloader";
import { typeDefs } from "../../graphql/typedefs";
import { resolvers } from "../../graphql/resolvers";
import jwt from "jsonwebtoken";
const cors = Cors({
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
});

import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  isAuthenticated,
  isCurrentUserDirectiveTransformer,
  permission,
} from "../../graphql/directives";
import { newCookie, posgres } from "../../utils";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = isCurrentUserDirectiveTransformer(schema, "isCurrentUser");
schema = isAuthenticated(schema, "authenticated");
schema = permission(schema, "permission");

// DATALOADER
// implementing dataloader to avoid the n+1 queries (met it with the searchBook query)
const loaders = {
  authors: new DataLoader(async (ids) => {
    const rows = await posgres("authors").select().whereIn("author_id", ids);

    // look up object
    const lookup = rows.reduce((acc, row) => {
      acc[row.author_id] = row;
      return acc;
    }, {});

    return ids.map((id) => lookup[id] || null);
  }),
};

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const token = req.cookies.token;
    if (!token) return { user: null, loaders, res };
    const { user } = jwt.verify(token, process.env.TOKEY);
    if (!user) return { user: null, loaders, res };

    // "refreshing" the cookie jwt
    // check if the token is about to expire in 60 seconds
    // if the user sends a request within the time frame, give them a new cookie
    const now = Math.floor(Date.now() / 1000);
    if (user?.exp - now <= 60 && user?.exp - now >= 0) {
      newCookie(user, res);
    }
    return { user, loaders, res };
  },
  // For apollo studio
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
