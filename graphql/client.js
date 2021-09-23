import { offsetLimitPagination } from "@apollo/client/utilities";

const { ApolloClient, InMemoryCache } = require("@apollo/client");

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // getBooks: offsetLimitPagination(),
        },
      },
    },
  }),
});
