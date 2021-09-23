import Book from "@/components/Book";
import BooksList from "@/components/BooksList";
import Hero from "@/components/Hero";
import BookSlide from "@/components/skeleton/BookSlide";
import HomePageSkeleton from "@/components/skeleton/HomePage";
import { useQuery, gql } from "@apollo/client";
import { SwiperSlide } from "swiper/react";
import HeadHTML from "../components/layout/Head";

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

  return (
    <>
      <HeadHTML title="Home" />
      <Hero />
      {loading && <HomePageSkeleton />}
      {data && (
        <div className=" sm:pt-8">
          <BooksList title="Newly Added" href="/books">
            {data?.newBooks?.map((book) => (
              <SwiperSlide key={book.id} className="">
                <Book book={book} />
              </SwiperSlide>
            ))}
          </BooksList>
          <BooksList title="Politics" href="/categories/politics">
            {data?.politics?.map((book) => (
              <SwiperSlide key={book.id} className="">
                <Book book={book} />
              </SwiperSlide>
            ))}
          </BooksList>
          <BooksList title="History" href="/categories/history">
            {data?.history?.map((book) => (
              <SwiperSlide key={book.id} className="">
                <Book book={book} />
              </SwiperSlide>
            ))}
          </BooksList>
          <BooksList title="Economics" href="/categories/economics">
            {data?.economics?.map((book) => (
              <SwiperSlide key={book.id} className="">
                <Book book={book} />
              </SwiperSlide>
            ))}
          </BooksList>
        </div>
      )}
    </>
  );
};

export default Home;
