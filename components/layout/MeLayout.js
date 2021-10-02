import LayoutWrapper from "./Layout";
import { UserCircleIcon, CogIcon } from "@heroicons/react/outline";
import { classNames } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "context/AuthContext";
import Footer from "./Footer";
import Navigation from "./Navigation";

const navigation = [
  { name: "Info", icon: UserCircleIcon, href: "/me" },
  { name: "Settings", icon: CogIcon, href: "/me/settings" },
];

const MeLayout = ({ children }) => {
  const { pathname } = useRouter();

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen overflow-hidden bg-gray-700 ms:bg-white">
          <header>
            <Navigation />
          </header>
          <main className="w-screen flex flex-col justify-center overflow-hidden mb-auto ">
            <div className="max-w-7xl w-full ms:py-4 ms:px-2 sm:px-4 lg:px-8 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-12 ms:rounded-md overflow-hidden">
                <nav
                  className="bg-gray-800 p-4 col-span-2 flex md:flex-col gap-2"
                  aria-label="Sidebar"
                >
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          isActive(item.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-300",
                            "flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="hidden 2xs:block">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
                <div className="col-span-10 w-full bg-gray-700 text-white p-4">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <footer className="p-4 bg-gray-800 text-white">
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MeLayout;
