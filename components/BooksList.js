import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import Book from "./Book";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

const BooksList = ({ title, href, books }) => {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesPerView, setSlidePerView] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const handleNextSlides = () => {
    return swiperRef?.current?.swiper?.slideTo(activeSlide + slidesPerView);
  };

  const handlePrevSlides = () => {
    return swiperRef?.current?.swiper?.slideTo(activeSlide - slidesPerView);
  };

  const params = {
    spaceBetween: 16,
    slidesPerView: 4,
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
      1: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <div className="pt-2 sm:pt-8 pb-4 px-2 overflow-hidden relative">
      <div className="mb-4 xs:mb-6 flex items-center xs:flex-row justify-between xs:items-baseline ">
        <div className="flex items-baseline gap-2">
          <h2
            className="text-base xs:text-lg sm:text-2xl font-bold"
            aria-label={title}
          >
            {title}
          </h2>
          {href && (
            <Link href={href}>
              <a className="flex text-xs xs:text-sm md:text-base items-center group text-gray-500">
                <span>View All </span>
                <ChevronDoubleRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </a>
            </Link>
          )}
        </div>
        <div
          className={`flex xs:mt-0 items-center gap-4 ${
            slidesPerView >= slideCount ? "hidden" : ""
          }`}
        >
          <div className="hidden sm:block bg-indigo-100 h-2 w-12 sm:w-18 rounded-md overflow-hidden">
            <div
              className="bg-indigo-500 h-2 transition-all"
              style={{ width: `${progress * 100}%` }}
            >
              &nbsp;
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center disabled:bg-gray-600"
              onClick={handlePrevSlides}
              disabled={activeSlide === 0}
            >
              <ChevronDoubleLeftIcon
                className="-ml-0.5 h-2 w-2 xs:h-4 xs:w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center disabled:bg-gray-500"
              onClick={handleNextSlides}
              disabled={activeSlide + slidesPerView === slideCount}
            >
              <ChevronDoubleRightIcon
                className="-ml-0.5 h-2 w-2 xs:h-4 xs:w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        {...params}
        onSlideChange={() => {
          setActiveSlide(swiperRef?.current?.swiper?.activeIndex);
        }}
        onAfterInit={(swiper) => {
          setSlidePerView(swiper?.params?.slidesPerView);
          setSlideCount(swiper?.slides?.length);
        }}
        onProgress={(_, progress) => setProgress(progress)}
      >
        {books.map((n) => (
          <SwiperSlide key={n} className="">
            <Book />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksList;
