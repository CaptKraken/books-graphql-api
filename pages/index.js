import BooksList from "@/components/BooksList";
import Hero from "@/components/Hero";
import BookSlide from "@/components/skeleton/BookSlide";
import HomePageSkeleton from "@/components/skeleton/HomePage";
import { useQuery, gql } from "@apollo/client";
import HeadHTML from "../components/layout/Head";
const newbooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const politics = [1, 2, 3, 4, 5];
const history = [1, 2, 3];
const economics = [
  1, 2, 80, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 686, 58, 45, 3, 133, 13,
];
const Home = () => {
  const GET_BOOK = gql`
    query Query {
      newBooks: getBooks(sortBy: "book_id", sortDirection: "desc") {
        id
        title
        image_url
        authors {
          name
        }
      }
      history: getBooksByCategory(category_id: 1) {
        id
        title
        image_url
        authors {
          name
        }
      }
      politics: getBooksByCategory(category_id: 2) {
        id
        title
        image_url
        authors {
          name
        }
      }
      economics: getBooksByCategory(category_id: 3) {
        id
        title
        image_url
        authors {
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_BOOK);

  if (data) console.log(data);

  return (
    <>
      <HeadHTML title="Home" />
      <Hero />
      {loading && <HomePageSkeleton />}
      <BooksList title="Newly Added" href="/books" books={data?.newBooks} />
      <BooksList
        title="Politics"
        href="/categories/politics"
        books={data?.politics}
      />
      <BooksList
        title="History"
        href="/categories/history"
        books={data?.history}
      />
      <BooksList
        title="Economics"
        href="/categories/economics"
        books={data?.economics}
      />
    </>
  );
};

export default Home;
