import Slider from "react-slick";
import Book from "./Book";
import Image from "next/image";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { createRef, useEffect, useRef } from "react";
const nine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var settings = {
  accessibility: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

{
  /* {nine.map((n) => (
        <Book key={n} />
      ))} */
}

const BookList = () => {
  let sliderRef = createRef();

  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const prev = () => {
    sliderRef?.current?.slickPrev();
  };
  return (
    <div
      className="mt-2 overflow-x-hidden py-4 px-2"
      style={{ minHeight: "50rem" }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
            onClick={prev}
          >
            <ChevronDoubleLeftIcon
              className="-ml-0.5 h-4 w-4"
              aria-hidden="true"
            />
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
            onClick={next}
          >
            <ChevronDoubleRightIcon
              className="-ml-0.5 h-4 w-4"
              aria-hidden="true"
            />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {nine.map((n) => (
          <Book key={n} />
        ))}
      </Slider>
    </div>
  );
};

export default BookList;
