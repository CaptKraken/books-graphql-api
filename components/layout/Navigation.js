import Link from "next/link";
import {
  MenuAlt3Icon,
  SearchIcon,
  BellIcon,
  XIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { classNames, getInitial } from "../../utils/client";
import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import SignInBtn from "../SignInBtn";
import { useAuth } from "context/AuthContext";

const navitems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Books",
    href: "/books",
  },
  {
    text: "Search",
    href: "/search",
  },
];
const profilemenus = [
  {
    text: "Your Profile",
    href: "/me",
  },
  {
    text: "Settings",
    href: "/me/settings",
  },
  {
    text: "Sign out",
    href: "/auth/signout",
  },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  profile_image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const Navigation = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const { pathname } = useRouter();

  const isActive = (href) => {
    if (href === "/" && pathname === href) return true;
    return href !== "/" && pathname.includes(href);
  };

  const router = useRouter();
  const searchbarRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchterm = searchbarRef?.current?.value;
    if (!searchterm) return;
    router.push(`/search?q=${searchterm}`);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center px-2 lg:px-0">
                {/* LOGO */}
                <div className="flex-shrink-0">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                {/* MAIN MENU */}
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {navitems.map((item) => (
                      <Link href={item.href} key={item.href}>
                        <a
                          className={classNames(
                            isActive(item.href)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.text}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                {/* SEARCH */}
                <form
                  className="max-w-lg w-full lg:max-w-xs"
                  onSubmit={handleSearch}
                >
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      ref={searchbarRef}
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              {/* Mobile nav button */}
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              {!isAuthenticated && (
                <div className="hidden sm:block">
                  <Link href="/auth/signin">
                    <a className="ml-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <LoginIcon
                        className="-ml-0.5 h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="hidden md:ml-2 lg:inline-block">
                        Sign In
                      </span>
                    </a>
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    <button className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              {currentUser?.profile_image && (
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={currentUser?.profile_image}
                                  alt=""
                                />
                              )}
                              {!currentUser?.profile_image && (
                                <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                                  <p>{getInitial(currentUser?.name)}</p>
                                </div>
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            {/* mobile main menu */}
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profilemenus.map((item) => (
                                <Menu.Item key={item.href}>
                                  <Link href={item.href}>
                                    <a
                                      className={classNames(
                                        isActive(item.href)
                                          ? "bg-gray-100"
                                          : "",
                                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      )}
                                    >
                                      {item.text}
                                    </a>
                                  </Link>
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {navitems.map((item) => (
                <Link href={item.href} key={item.href}>
                  <a
                    className={`${
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                  >
                    {item.text}
                  </a>
                </Link>
              ))}
              {!isAuthenticated && (
                <Link href="/auth/signin">
                  <a
                    className="sm:hidden inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                    onClick={() => setIsAuthenticated(true)}
                  >
                    <LoginIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                    <span className="ml-2 inline-block">Sign In</span>
                  </a>
                </Link>
              )}
            </div>

            {/* mobile profile menu */}
            {isAuthenticated && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser?.profile_image}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {currentUser?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {currentUser?.email}
                    </div>
                  </div>
                  <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profilemenus.map((item) => (
                    <Link href={item.href} key={item.href}>
                      <a
                        className={classNames(
                          isActive(item.href) ? "bg-gray-900 text-white" : "",
                          "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        )}
                      >
                        {item.text}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
