import BooksList from "@/components/BooksList";
import Hero from "@/components/Hero";
import HeadHTML from "../components/layout/Head";
const newbooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const politics = [1, 2, 3, 4, 5];
const history = [1, 2, 3];
const economics = [
  1, 2, 80, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 686, 58, 45, 3, 133, 13,
];
const Home = () => {
  return (
    <>
      <HeadHTML title="Home" />
      <Hero />
      <BooksList title="Newly Added" href="/books" books={newbooks} />
      <BooksList
        title="Politics"
        href="/categories/politics"
        books={politics}
      />
      <BooksList title="History" href="/categories/history" books={history} />
      <BooksList
        title="Economics"
        href="/categories/economics"
        books={economics}
      />
    </>
  );
};

export default Home;
