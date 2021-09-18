import BookList from "@/components/BookList";
import Hero from "@/components/Hero";
import HeadHTML from "../components/layout/Head";

const Home = () => {
  return (
    <>
      <HeadHTML title="Home" />
      <Hero />
      <BookList />
    </>
  );
};

export default Home;
