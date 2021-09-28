import { GET_SINGLE_AUTHOR } from "@/graphql/client/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { plural, getInitial } from "@/utils/client";
import { BookOpenIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import BookCard from "@/components/BookCard";
import SingleAuthor from "@/components/skeleton/SingleAuthor";
import Link from "next/link";
const SingleAuthorPage = () => {
  const router = useRouter();
  const { id: authorid } = router.query;

  const { loading, error, data } = useQuery(GET_SINGLE_AUTHOR, {
    variables: {
      authorid: String(authorid),
    },
  });
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
  if (loading) return <SingleAuthor />;
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full bg-indigo-100 p-2 rounded-md h-36 flex items-center gap-4 justify-center">
        <div className="h-16 w-16 2xs:w-24 2xs:h-24 bg-indigo-200 rounded-full flex items-center justify-center">
          <span className="text-xl 2xs:text-3xl sm:text-4xl">
            {getInitial(data?.author?.name)}
          </span>
        </div>
        <div>
          <p className="text-sm sm:text-base">ID: {data?.author?.id}</p>
          <p className="text-sm sm:text-base">Name: {data?.author?.name}</p>
          <div className="flex gap-2 items-center">
            <span>
              <BookOpenIcon className="w-4 h-4" />
            </span>
            <p className="text-sm sm:text-base">
              {data?.author?.book_count} book
              {plural(data?.author?.book_count)}
            </p>
          </div>
        </div>
      </div>
      {data?.author?.books?.length === 0 && (
        <div className="bg-indigo-100 rounded-md p-8 flex items-center justify-center">
          <ExclamationCircleIcon className="w-6 h-6" />
          <h3>There's no book by this author in our database.</h3>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {data?.author?.books?.map((book) => (
          <div className="col-span-2 md:col-span-1">
            <BookCard book={book} key={book.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleAuthorPage;
