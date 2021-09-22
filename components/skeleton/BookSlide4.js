import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

const BookSlide4 = () => {
  return (
    <div className="pt-2 sm:pt-8 pb-4 px-2 overflow-hidden relative">
      <div className="mb-4 flex items-center xs:flex-row justify-between xs:items-baseline animate-pulse ">
        <div className="flex items-center gap-2">
          <h2 className="text-sm xs:text-base sm:text-xl font-bold bg-gray-600 w-14 xs:w-20 sm:w-40 rounded-md">
            &nbsp;
          </h2>
          <div className="flex text-xs xs:text-sm md:text-base items-center group text-gray-500">
            <span className="w-8 sm:w-12 h-4 bg-gray-500 rounded-md">
              &nbsp;
            </span>
            <ChevronDoubleRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
        <div className={`flex xs:mt-0 items-center gap-4`}>
          <div className="hidden sm:block bg-indigo-100 h-2 w-12 sm:w-18 rounded-md overflow-hidden">
            <div className="bg-gray-600 h-2 transition-all w-full">&nbsp;</div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white w-full justify-center disabled:bg-gray-600"
              disabled
            >
              <ChevronDoubleLeftIcon
                className="-ml-0.5 h-2 w-2 xs:h-4 xs:w-4"
                aria-hidden="true"
              />
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white  w-full justify-center disabled:bg-gray-500"
              disabled
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
      <div className="bg-gray-600 rounded-md animate-pulse w-full p-2 h-96 2xs:h-72 sm:h-72 lg:h-82 max-h-96 flex justify-between sm:p-4 gap-4">
        <div className="bg-gray-400 w-full xs:1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 rounded-md">
          &nbsp;
        </div>
        <div className="bg-gray-400 hidden w-full xs:1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 rounded-md 2xs:block">
          &nbsp;
        </div>
        <div className="bg-gray-400 hidden sm:w-1/3 lg:w-1/4 rounded-md sm:block">
          &nbsp;
        </div>
        <div className="bg-gray-400 hidden lg:w-1/4 rounded-md lg:block">
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default BookSlide4;
