import { useRouter } from "next/router";
import { MAX_FETCH_SEARCH, BASE_URL } from "@/utils/client";
import { SEARCH_FOR_BOOKS } from "@/graphql/client/queries";
import { useQuery } from "@apollo/client";
import HeadHTML from "@/components/layout/Head";
import AllBooks from "@/components/skeleton/AllBooks";
import Book from "@/components/Book";
import SearchPagination from "@/components/SearchPagination";
import { ExclamationCircleIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import SideBarElement from "@/components/SideBarElement";
import { useState } from "react";
import SearchBooks from "@/components/skeleton/SearchBooks";

const SearchPage = ({ server_rendered }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchterm = router.query.q || "";
  const page = Number(router.query.page) || 0;
  const offset = page - 1 < 1 ? 0 : (page - 1) * MAX_FETCH_SEARCH;
  const totalPageCount = Math.ceil(
    server_rendered?.data?.resultCount / MAX_FETCH_SEARCH
  );
  const handleInput = (e) => {
    return setSearchTerm(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm === searchterm) return;
    router.push(`/search?q=${searchTerm}`);
  };

  const { data, loading, error } = useQuery(SEARCH_FOR_BOOKS, {
    variables: {
      searchterm,
      offset,
      limit: MAX_FETCH_SEARCH,
    },
  });
  if ((page > totalPageCount || error) && searchterm)
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

  return (
    <div>
      <HeadHTML title="Search" />
      <form onSubmit={handleSearch}>
        <div className="w-full mb-4 rounded-md flex items-center relative">
          <label className="sr-only">Search for books</label>
          <SearchIcon className="w-6 h-6 absolute left-2 text-gray-400" />
          <input
            type="text"
            onChange={handleInput}
            defaultValue={searchterm}
            placeholder="Search for title, description, author"
            className="w-full p-4 pl-10 bg-indigo-100 rounded-md"
          />
        </div>
      </form>
      <div className="flex flex-col md:flex-row justify-between w-full gap-4">
        {!searchterm && (
          <div className="mt-4 md:w-9/12">
            <h2 className="text-lg ms:text-2xl">
              Start searching for books with the search bar above
            </h2>
            <div className="flex items-center justify-center">
              <SearchIcon className="w-1/2  text-indigo-100" />
            </div>
          </div>
        )}
        <div className="md:w-9/12">
          {loading && <SearchBooks />}
          {data && (
            <div className="px-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
                <h2 className="text-base xs:text-lg sm:text-2xl font-bold">
                  Search Results for '{searchterm}'
                </h2>
                {totalPageCount > 1 && (
                  <SearchPagination
                    searchterm={searchterm}
                    totalPageCount={totalPageCount}
                    currentPage={page}
                  />
                )}
              </div>
              {data && (
                <div className="grid gap-4 grid-cols-2 2xs:grid-cols-3 lg:grid-cols-4">
                  {data?.result?.map((book) => (
                    <Book key={book.id} book={book} small />
                  ))}
                </div>
              )}
              {data?.books?.length === 0 && <div>No books</div>}
            </div>
          )}
        </div>
        <div className="pt-2 md:w-3/12">
          <div className="bg-gray-600 md:hidden rounded-md w-full">&nbsp;</div>
          <div>
            <SideBarElement href="/authors" title="Authors">
              {!server_rendered?.data?.authors && (
                <h3 className="text-sm xs:text-base sm:text-xl">
                  Error fetching authors.
                </h3>
              )}
              {server_rendered?.data?.authors?.map((author) => (
                <Link href={`/authors/${author.id}`} key={author.id}>
                  <a className="px-1 rounded-md bg-indigo-400 hover:bg-indigo-300 text-sm ms:text-base">
                    {author.name}
                  </a>
                </Link>
              ))}
            </SideBarElement>
            <SideBarElement href="/categories" title="Categories">
              {!server_rendered?.data?.categories && (
                <h3 className="text-sm xs:text-base sm:text-xl">
                  Error fetching categories.
                </h3>
              )}
              {server_rendered?.data?.categories?.map((category) => (
                <Link
                  href={`/categories/${category.name_english}`}
                  key={category.id}
                >
                  <a className="px-1 rounded-md bg-indigo-400 hover:bg-indigo-300 text-sm ms:text-base">
                    {category.name_english}
                  </a>
                </Link>
              ))}
            </SideBarElement>
          </div>
        </div>
      </div>
    </div>
  );
};
// TODO: PAGINATION FOR SEARCH PAGE

export async function getServerSideProps({ query: { q } }) {
  const searchterm = q || "";

  const req = await fetch(`${BASE_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Query($searchterm: String) {
                resultCount: countSearchResult(searchTerm: $searchterm)
                authors: getAuthors(limit: 10) {
                    id
                    name
                  }
                  categories: getCategories(limit: 10) {
                    id
                    name_english
                  }
              }`,
      variables: {
        searchterm,
      },
    }),
  });
  const data = await req.json();
  //   console.log(data);
  // Pass data to the page via props

  return { props: { server_rendered: data } };
}

export default SearchPage;
