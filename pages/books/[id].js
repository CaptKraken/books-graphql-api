import { GET_RELATED_BOOKS } from "@/graphql/client/queries";
import { useQuery } from "@apollo/client";
import { BookOpenIcon, UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import BooksList from "@/components/BooksList";
import { SwiperSlide } from "swiper/react";
import Book from "@/components/Book";
import { BASE_URL } from "@/utils/client";
import HeadHTML from "@/components/layout/Head";

const params = {
  spaceBetween: 16,
  slidesPerView: 6,
  breakpoints: {
    1024: {
      slidesPerView: 6,
    },
    640: {
      slidesPerView: 5,
    },
    450: {
      slidesPerView: 4,
    },
    300: {
      slidesPerView: 3,
    },
    1: {
      slidesPerView: 2,
    },
  },
};
const BookDetails = ({ server_rendered }) => {
  const categoryid = server_rendered?.data?.book?.categories[1]?.id;

  const { data, error, loading } = useQuery(GET_RELATED_BOOKS, {
    variables: {
      categoryid: categoryid ?? 1,
      limit: 12,
    },
  });

  if (error || (!data?.books && !loading))
    return (
      <div className="w-full flex justify-center mt-4">
        <HeadHTML title="Error" />
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
  if (loading)
    return (
      <div className="animate-bounce flex flex-col items-center">
        <HeadHTML title="Loading" />
        <BookOpenIcon className="h-12 w-12 text-indigo-500" />
        <p>Loading</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <HeadHTML title={server_rendered?.data?.book?.title} />
      <div className="sm:my-8">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl">
          {server_rendered?.data?.book?.title}
        </h2>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row mt-2">
        <div className="flex items-center justify-center my-3 sm:my-0 sm:items-start sm:justify-end lg:flex-none">
          <Image
            src={server_rendered?.data?.book?.image_url}
            width={300}
            height={450}
          />
        </div>
        <div style={{ flex: "60%" }}>
          <dl className="grid grid-cols-4 lg:grid-cols-5 gap-2">
            <dt className="col-span-4 xs:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Title:
            </dt>
            <dd className="col-span-4 xs:col-span-3 lg:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900">
              {server_rendered?.data?.book?.title}
            </dd>
            <dt className="col-span-4 xs:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Published:
            </dt>
            <dd className="col-span-4 xs:col-span-3 lg:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900">
              {server_rendered?.data?.book?.published}
            </dd>
            <dt className="col-span-4 xs:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Page Count:
            </dt>
            <dd className="col-span-4 xs:col-span-3 lg:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900">
              {server_rendered?.data?.book?.page_count}
            </dd>
            <dt className="col-span-4 xs:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Authors:
            </dt>
            <dd className="col-span-4 xs:col-span-3 lg:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900 flex flex-col">
              {server_rendered?.data?.book?.authors?.map((author) => (
                <Link href={`/authors/${author.id}`} key={author.id}>
                  <a className="text-xs xs:text-sm lg:text-base hover:underline w-max">
                    {author.name}
                  </a>
                </Link>
              ))}
            </dd>
            <dt className="col-span-4 xs:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Categories:
            </dt>
            <dd className="col-span-4 xs:col-span-3 lg:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900 flex gap-2">
              {server_rendered?.data?.book?.categories?.map((category) => (
                <Link
                  href={`/categories/${category?.name_english}`}
                  key={category?.id}
                >
                  <a className="text-xs xs:text-sm lg:text-base flex gap-2 hover:underline">
                    <span>{category?.name_english}</span>
                    {/* <span>{category.name_khmer}</span> */}
                  </a>
                </Link>
              ))}
            </dd>
            <dt className="col-span-4 lg:col-span-1 text-xs xs:text-sm lg:text-base font-medium text-gray-500">
              Description:
            </dt>
            <dd className="col-span-4 md:col-span-4 text-xs xs:text-sm lg:text-base text-gray-900">
              {parse(server_rendered?.data?.book?.description || "")}
            </dd>
          </dl>
        </div>
      </div>
      <div className="w-full mt-4">
        <BooksList title="Related Books" params={params}>
          {data?.books?.map((book) => (
            <SwiperSlide key={book.id} className="">
              <Book book={book} small />
            </SwiperSlide>
          ))}
        </BooksList>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query: id }) {
  const query = `
    query ExampleQuery($bookid: ID!) {
        book: getBook(bookid: $bookid) {
          id
          title
          published
          page_count
          authors {
            id
            name
          }
          categories {
            id
            name_english
            name_khmer
          }
          description
          image_url
        }
      }
    `;

  const req = await fetch(`${BASE_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        bookid: id.id,
      },
    }),
  });
  const data = await req.json();
  // Pass data to the page via props
  return { props: { server_rendered: data } };
}

export default BookDetails;
