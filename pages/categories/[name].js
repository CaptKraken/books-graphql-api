import { GET_SINGLE_CATEGORY } from "@/graphql/client/queries";
import { BASE_URL } from "@/utils/client";
import { useQuery } from "@apollo/client";
import { plural, getInitial } from "@/utils/client";
import { BookOpenIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import BookCard from "@/components/BookCard";
import SingleAuthor from "@/components/skeleton/SingleAuthor";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadHTML from "@/components/layout/Head";

const SingleCategoryPage = ({ category_id }) => {
  const router = useRouter();
  const { name } = router.query;
  const { loading, error, data } = useQuery(GET_SINGLE_CATEGORY, {
    variables: {
      categoryid: String(category_id),
    },
  });

  if (category_id === 0)
    return (
      <div className="w-full flex justify-center mt-4">
        <div>
          <h3 className="text-2xl flex items-center gap-2">
            <ExclamationCircleIcon className="h-8 w-8" />
            <span>Error</span>
          </h3>
          <p>Category "{name}" not found.</p>
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

  if (error)
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
  if (loading) return <SingleAuthor />;
  return (
    <div className="flex flex-col gap-4">
      <HeadHTML title={data?.category?.name_english} />
      <div className="w-full bg-indigo-100 px-2 py-4 rounded-md">
        <h2 className="text-base sm:text-xl text-center font-bold mb-2">
          Category Info
        </h2>
        <div className=" flex items-center gap-4 justify-center">
          <div className="h-16 w-16 2xs:w-24 2xs:h-24 bg-indigo-200 rounded-full flex items-center justify-center">
            <span className="text-xl 2xs:text-3xl sm:text-4xl">
              {getInitial(data?.category?.name_english)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm sm:text-base">ID:</p>
            <p className="text-sm sm:text-base">{data?.category?.id}</p>
            <p className="text-sm sm:text-base">Name:</p>
            <p className="text-sm sm:text-base">
              {data?.category?.name_english}
            </p>
            <p className="text-sm sm:text-base">Khmer:</p>
            <p className="text-sm sm:text-base">{data?.category?.name_khmer}</p>
            <div className="flex gap-2 items-center">
              <span>
                <BookOpenIcon className="w-4 h-4" />
              </span>
              <p className="text-sm sm:text-base">
                {data?.category?.book_count} book
                {plural(data?.category?.book_count)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {data?.category?.books?.length === 0 && (
        <div className="bg-indigo-100 rounded-md p-8 flex items-center justify-center">
          <ExclamationCircleIcon className="w-6 h-6" />
          <h3>There's no book in this category in our database.</h3>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {data?.category?.books?.map((book) => (
          <div className="col-span-2 md:col-span-1" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query: { name } }) {
  const query = `
  query Query($field: String, $value: String) {
    category: getCategory(field: $field, value: $value) {
      id
    }
  }
  `;

  const req = await fetch(`${BASE_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        field: "category_name",
        value: name,
      },
    }),
  });
  const data = await req.json();

  // Pass data to the page via props
  return { props: { category_id: data?.data?.category?.id || 0 } };
}

export default SingleCategoryPage;
