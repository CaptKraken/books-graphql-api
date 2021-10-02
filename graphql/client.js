import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const { ApolloClient, InMemoryCache } = require("@apollo/client");

const uploadLink = createUploadLink({ uri: "/api/graphql" });

export const client = new ApolloClient({
  // uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // getBooks: offsetLimitPagination(),
        },
      },
    },
  }),
  link: uploadLink,
});
