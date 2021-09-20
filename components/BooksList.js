import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Book from "./Book";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

const calcProgress = (slideCount, slidesPerView) => {
  const extra = slideCount % slidesPerView !== 0 ? 1 : 0;
  return Math.floor(slideCount / slidesPerView) + extra;
};

const BooksList = () => {
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

  const nine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <div className="py-8 px-2 overflow-hidden relative">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 h-2 w-24 rounded-md overflow-hidden">
            <div
              className="bg-indigo-500 h-2 transition-all"
              style={{ width: `${progress * 100}%` }}
            >
              &nbsp;
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
              onClick={handlePrevSlides}
            >
              <ChevronDoubleLeftIcon
                className="-ml-0.5 h-4 w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
              onClick={handleNextSlides}
            >
              <ChevronDoubleRightIcon
                className="-ml-0.5 h-4 w-4"
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
        onToEdge={(swiper) => {
          console.log("hi", swiper);
        }}
        onProgress={(_, progress) => setProgress(progress)}
      >
        {nine.map((n) => (
          <SwiperSlide key={n} className="overflow-visible">
            <Book />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksList;
// swiperRef.current.swiper.slideNext()}
// swiperRef.current.swiper.slidePrev()
