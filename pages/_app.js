import "@/styles/global.css";
import "tailwindcss/tailwind.css";
import LayoutWrapper from "@/components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import { AuthProvider } from "context/AuthContext";
function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ApolloProvider client={client}>
       <AuthProvider>
        <LayoutWrapper>{page}</LayoutWrapper>
        </AuthProvider>
      </ApolloProvider>
    ));
  return getLayout(<Component {...pageProps} />);
  return (
    <ApolloProvider client={client}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
