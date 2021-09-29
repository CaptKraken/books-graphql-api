import { classNames } from "@/utils/client";
import Link from "next/link";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const generateUrl = (searchTerm, currentpage) => {
  if (currentpage === 0 || currentpage === 1) return `/search?q=${searchTerm}`;
  return `/search?q=${searchTerm}&page=${currentpage}`;
};

const SearchPagination = ({
  searchterm,
  totalPageCount = 1,
  currentPage,
  firstLast,
}) => {
  if (currentPage <= 1) currentPage = 1;
  const tpc = [...Array(totalPageCount).keys()];
  const btn =
    "text-xs xs:text-sm sm:text-base bg-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-400 flex items-center";
  return (
    <div className="text-white flex flex-row gap-2">
      {currentPage - 1 !== 0 && (
        <>
          {firstLast && (
            <Link href={generateUrl(searchterm, 0)}>
              <a className={classNames(btn)}>
                <ChevronDoubleLeftIcon className="h-2 w-2 xs:h-4 xs:w-4" />
                <span className="sr-only">First Page</span>
              </a>
            </Link>
          )}
          <Link href={generateUrl(searchterm, currentPage - 1)}>
            <a className={classNames(btn)}>
              <ChevronLeftIcon className="xs:h-4 h-2 w-2 xs:w-4" />
              <span className="sr-only">Previous Page</span>
            </a>
          </Link>
        </>
      )}
      {tpc.map((t) => {
        if (t + 1 === currentPage) {
          return (
            <Link href={generateUrl(searchterm, t + 1)} key={t + 1}>
              <a
                className={classNames(btn, "bg-yellow-500 hover:bg-yellow-400")}
              >
                {t + 1}
              </a>
            </Link>
          );
        }
        return (
          <Link href={generateUrl(searchterm, t + 1)} key={t + 1}>
            <a className={classNames(btn)}>{t + 1}</a>
          </Link>
        );
      })}
      {currentPage <= totalPageCount - 1 && (
        <>
          <Link href={generateUrl(searchterm, currentPage + 1)}>
            <a className={classNames(btn)}>
              <ChevronRightIcon className="h-2 w-2 xs:h-4  xs:w-4" />
              <span className="sr-only">First Page</span>
            </a>
          </Link>
          {firstLast && (
            <Link href={generateUrl(searchterm, totalPageCount)}>
              <a className={classNames(btn)}>
                <ChevronDoubleRightIcon className=" xs:h-4 h-2 w-2 xs:w-4" />
                <span className="sr-only">First Page</span>
              </a>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPagination;
