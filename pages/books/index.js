import Book from "@/components/Book";
import BooksList from "@/components/BooksList";
import AllBooks from "@/components/skeleton/AllBooks";
import Link from "next/link";
import BookSlide4 from "@/components/skeleton/BookSlide4";
import { useQuery, gql } from "@apollo/client";
import { SwiperSlide } from "swiper/react";
import HeadHTML from "../../components/layout/Head";
import { BASE_URL } from "@/utils/client";
import SideBarElement from "@/components/SideBarElement";

const BooksPage = ({ server_rendered }) => {
  // const GET_POPULAR_BOOK = gql`
  //   query Query($sortBy: String, $direction: String, $limit: Int) {
  //     popularBooks: getBooks(
  //       sortBy: $sortBy
  //       sortDirection: $direction
  //       limit: $limit
  //     ) {
  //       id
  //       title
  //       image_url
  //       authors {
  //         name
  //       }
  //     }
  //   }
  // `;
  // const { data: popular, loading, error } = useQuery(GET_POPULAR_BOOK, {
  //   variables: {
  //     limit: 6,
  //     sortBy: "view",
  //     direction: "asc",
  //   },
  // });
  const GET_BOOK = gql`
    query Query($sortBy: String, $direction: String, $limit: Int) {
      books: getBooks(
        sortBy: $sortBy
        sortDirection: $direction
        limit: $limit
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
  const { data, loading, error, fetchMore } = useQuery(GET_BOOK, {
    variables: {
      limit: 6,
      sortBy: "book_id",
      direction: "desc",
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
          {loading && <BookSlide4 />}
          <BooksList title="Newly Added" params={params}>
            {data?.books?.map((book) => (
              <SwiperSlide key={book.id} className="">
                <Book book={book} small />
              </SwiperSlide>
            ))}
          </BooksList>
          {loading && <AllBooks />}
          <div className="px-2 flex flex-col gap-4">
            <h2 className="text-base xs:text-lg sm:text-2xl font-bold">
              All Books
            </h2>
            <div className="grid gap-4 grid-cols-2 2xs:grid-cols-3">
              {data &&
                data?.books?.map((book) => (
                  <Book key={book.id} book={book} small />
                ))}
            </div>
          </div>
        </div>
        <div className="pt-2 md:w-3/12">
          <div className="bg-gray-600 md:hidden rounded-md w-full">&nbsp;</div>
          <SideBarElement title="Authors">
            {server_rendered?.data?.authors?.map((author) => (
              <Link href={`/authors/${author.id}`} key={author.id}>
                <a className="px-1 rounded-md bg-indigo-400 hover:bg-indigo-300">
                  {author.name}
                </a>
              </Link>
            ))}
          </SideBarElement>
          <SideBarElement title="Categories">
            {server_rendered?.data?.categories?.map((category) => (
              <Link
                href={`/categories/${category.name_english}`}
                key={category.id}
              >
                <a className="px-1 rounded-md bg-indigo-400 hover:bg-indigo-300">
                  {category.name_english}
                </a>
              </Link>
            ))}
          </SideBarElement>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${BASE_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query Query {
        authors: getAuthors {
          id
          name
        }
        categories: getCategories {
          id
          name_english
          name_khmer
        }
      }
      `,
    }),
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { server_rendered: data } };
}

export default BooksPage;
