import "@/styles/global.css";
import "tailwindcss/tailwind.css";
import LayoutWrapper from "@/components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
