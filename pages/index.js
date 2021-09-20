import BooksList from "@/components/BooksList";
import Hero from "@/components/Hero";
import HeadHTML from "../components/layout/Head";

const Home = () => {
  return (
    <>
      <HeadHTML title="Home" />
      <Hero />
      <BooksList />
    </>
  );
};

export default Home;
