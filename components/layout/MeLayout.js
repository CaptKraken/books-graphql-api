import LayoutWrapper from "./Layout";
import { UserCircleIcon, CogIcon } from "@heroicons/react/outline";
import { classNames } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "context/AuthContext";

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
        <LayoutWrapper>
          <div className="grid grid-cols-12 grid-rows-1 rounded-md overflow-hidden">
            <nav
              className="px-2 bg-gray-800 p-4 col-span-2"
              aria-label="Sidebar"
            >
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
            <div className="col-span-10 w-full bg-gray-700 text-white p-4">
              {children}
            </div>
          </div>
        </LayoutWrapper>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MeLayout;
