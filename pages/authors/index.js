import HeadHTML from "../../components/layout/Head";
import {plural } from "@/utils/client";
import Link from "next/link";
import { useState } from "react";
import { ExclamationCircleIcon, SearchIcon } from "@heroicons/react/outline";
import AllAuthors from "@/components/skeleton/AllAuthors";
import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "@/graphql/client/queries";
const AuthorsPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_AUTHORS);

  const [searchTerm, setSearchTerm] = useState("");
  if (error)
    return (
      <div className="w-full flex justify-center mt-4">
        <div>
          <h3 className="text-2xl flex items-center gap-2">
            <ExclamationCircleIcon className="h-8 w-8" />
            <span>Error</span>
          </h3>
          <p>Something went wrong. Please check again later.</p>
          <div className="mt-4">
            <Link href="/">
              <a className="bg-indigo-300 hover:bg-indigo-400 px-3 py-1 rounded-md">
                Go back to home page
              </a>
            </Link>
          </div>
        </div>
      </div>
    );

  const modifiedList = data?.authors?.filter((author) => {
    if (!searchTerm) return author;
    return author.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleInput = (e) => {
    return setSearchTerm(e.target.value);
  };

  if (loading) return <AllAuthors />;

  return (
    <div>
      <HeadHTML title="Authors" />
      <div className="w-full gap-4">
        <h2 className="text-base mb-2 xs:text-lg sm:text-2xl font-bold">
          All Authors
        </h2>
        <div className="w-full mb-4 rounded-md flex items-center relative">
          <SearchIcon className="w-6 h-6 absolute left-2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInput}
            placeholder="Search Authors by name"
            className="w-full p-4 pl-10 bg-indigo-100 rounded-md"
          />
        </div>
        <div className="grid 2xs:grid-cols-2 ms:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
          {data?.authors &&
            modifiedList.map((author) => (
              <Link key={author?.id} href={`/authors/${author?.id}`}>
                <a className="bg-indigo-200 px-4 py-2 transition-all hover:bg-indigo-300 rounded-md hover:-translate-y-1 text-xs xs:text-sm">
                  <span>{author?.name}</span>
                  <div>
                    {author?.book_count} book
                    {plural(author?.book_count)}
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default AuthorsPage;
