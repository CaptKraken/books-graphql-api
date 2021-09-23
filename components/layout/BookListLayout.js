import SideBarElement from "../SideBarElement";
import HeadHTML from "./Head";
import LayoutWrapper from "./Layout";

const BookListLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <div>
        <HeadHTML title="Books" />
        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
          {/* <div className="md:w-9/12 grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 gap-2"> */}
          <div className="md:w-9/12">{children}</div>
          <div className="pt-2 md:w-3/12 sticky">
            <div className="bg-gray-600 md:hidden rounded-md w-full">
              &nbsp;
            </div>
            <div className="sticky">
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
      </div>
    </LayoutWrapper>
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
          count: countBooks {
            count
          }
        }
        `,
    }),
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { server_rendered: data } };
}

export default BookListLayout;
