import Book from "@/components/Book";
import BooksList from "@/components/BooksList";
import AllBooks from "@/components/skeleton/AllBooks";
import Link from "next/link";
import BookSlide4 from "@/components/skeleton/BookSlide4";
import { useQuery, gql } from "@apollo/client";
import { SwiperSlide } from "swiper/react";
import HeadHTML from "@/components/layout/Head";
import { BASE_URL, MAX_FETCH } from "@/utils/client";
import SideBarElement from "@/components/SideBarElement";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

const BooksPage = ({ server_rendered }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const offset = page - 1 < 1 ? 0 : (page - 1) * MAX_FETCH;
  const totalPageCount = Math.ceil(server_rendered?.data?.count / MAX_FETCH);

  const GET_BOOK = gql`
    query Query(
      $sortBy: String
      $direction: String
      $limit: Int
      $offset: Int
    ) {
      books: getBooks(
        sortBy: $sortBy
        sortDirection: $direction
        limit: $limit
        offset: $offset
      ) {
        id
        title
        image_url
        authors {
          name
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: {
      offset,
      limit: MAX_FETCH,
      sortBy: "book_id",
      direction: "asc",
    },
  });

  const params = {
    spaceBetween: 16,
    slidesPerView: 4,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      // 640: {
      //   slidesPerView: 3,
      // },
      450: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 2,
      },
      1: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <div>
      <HeadHTML title="Books" />
      <div className="flex flex-col md:flex-row justify-between w-full gap-4">
        {/* <div className="md:w-9/12 grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 gap-2"> */}
        <div className="md:w-9/12">
          {server_rendered?.data?.latest_books && (
            <>
              {loading && <BookSlide4 />}
              <BooksList title="Newly Added" params={params}>
                {server_rendered?.data?.latest_books?.map((book) => (
                  <SwiperSlide key={book.id} className="">
                    <Book book={book} small />
                  </SwiperSlide>
                ))}
              </BooksList>
            </>
          )}
          {loading && <AllBooks />}
          <div className="px-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
              <h2 className="text-base xs:text-lg sm:text-2xl font-bold">
                All Books ({Math.ceil(server_rendered?.data?.count)})
              </h2>
              {totalPageCount > 1 && (
                <Pagination
                  totalPageCount={totalPageCount}
                  currentPage={page}
                />
              )}
            </div>
            {data && (
              <div className="grid gap-4 grid-cols-2 2xs:grid-cols-3">
                {data?.books?.map((book) => (
                  <Book key={book.id} book={book} small />
                ))}
              </div>
            )}
            {data?.books?.length === 0 && <div>No books</div>}
          </div>
        </div>
        <div className="pt-2 md:w-3/12">
          <div className="bg-gray-600 md:hidden rounded-md w-full">&nbsp;</div>
          <div className="sticky">
            <SideBarElement href="/authors" title="Authors">
              {server_rendered?.data?.authors?.map((author) => (
                <Link href={`/authors/${author.id}`} key={author.id}>
                  <a className="px-1 rounded-md bg-indigo-400 hover:bg-indigo-300 text-sm ms:text-base">
                    {author.name}
                  </a>
                </Link>
              ))}
            </SideBarElement>
            <SideBarElement href="/categories" title="Categories">
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

export async function getServerSideProps({ query: q }) {
  const mainpage = Object.keys(q).length === 0 || Number(q.page) === 1;

  const latest = `getBooks(
  sortBy: "book_id"
  sortDirection: "asc"
  limit: 6
) {
  id
  title
  image_url
  authors {
    name
  }
}`;

  const query = `query Query {
    authors: getAuthors(limit: 15) {
      id
      name
    }
    categories: getCategories(limit: 10) {
      id
      name_english
      name_khmer
    }
    count: countBooks
    ${mainpage ? `latest_books: ${latest}` : ``}
  }`;

  const req = await fetch(`${BASE_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await req.json();

  // Pass data to the page via props
  return { props: { server_rendered: data } };
}
export default BooksPage;
