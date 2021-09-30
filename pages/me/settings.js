import HeadHTML from "@/components/layout/Head";
import MeLayout from "@/components/layout/MeLayout";
import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "context/AuthContext";
const SettingsPage = () => {
  return (
    <>
      <HeadHTML title="Settings" />
      me page
    </>
  );
};

SettingsPage.getLayout = (page) => {
  return (
        <MeLayout>{page}</MeLayout>
  );
};

export default SettingsPage;
