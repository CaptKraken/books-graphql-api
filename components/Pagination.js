import { classNames } from "@/utils/client";
import Link from "next/link";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const generateUrl = (currentpage) => {
  if (currentpage === 0 || currentpage === 1) return `/books`;
  return `/books?page=${currentpage}`;
};

const Pagination = ({ totalPageCount = 1, currentPage }) => {
  if (currentPage <= 1) currentPage = 1;
  const tpc = [...Array(totalPageCount).keys()];
  const btn =
    "text-xs xs:text-sm sm:text-base bg-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-400 flex items-center";
  return (
    <div className="text-white flex flex-row gap-2">
      {currentPage - 1 !== 0 && (
        <>
          <Link href={generateUrl(0)}>
            <a className={classNames(btn)}>
              <ChevronDoubleLeftIcon className="h-2 w-2 xs:h-4 xs:w-4" />
              <span className="sr-only">First Page</span>
            </a>
          </Link>
          <Link href={generateUrl(currentPage - 1)}>
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
            <Link href={generateUrl(t + 1)} key={t + 1}>
              <a
                className={classNames(btn, "bg-yellow-500 hover:bg-yellow-400")}
              >
                {t + 1}
              </a>
            </Link>
          );
        }
        return (
          <Link href={generateUrl(t + 1)} key={t + 1}>
            <a className={classNames(btn)}>{t + 1}</a>
          </Link>
        );
      })}
      {currentPage <= totalPageCount - 1 && (
        <>
          <Link href={generateUrl(currentPage + 1)}>
            <a className={classNames(btn)}>
              <ChevronRightIcon className="h-2 w-2 xs:h-4  xs:w-4" />
              <span className="sr-only">First Page</span>
            </a>
          </Link>
          <Link href={generateUrl(totalPageCount)}>
            <a className={classNames(btn)}>
              <ChevronDoubleRightIcon className=" xs:h-4 h-2 w-2 xs:w-4" />
              <span className="sr-only">First Page</span>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Pagination;

// {tpc.length > 8 && (
//     <div className="flex items-center">
//       <Link href="/books">
//         <a className={classNames(btn)}>
//           <ChevronDoubleLeftIcon className="h-4 w-4" />
//           <span className="sr-only">First Page</span>
//         </a>
//       </Link>
//       <Link href={`/books?page=${currentPage - 1}`}>
//         <a className={classNames(btn)}>
//           <ChevronLeftIcon className="h-4 w-4" />
//           <span className="sr-only">Previous Page</span>
//         </a>
//       </Link>
//       {currentPage && <span className="text-black">{currentPage}</span>}
//       <Link href={`/books?page=${currentPage + 1}`}>
//         <a className={classNames(btn)}>
//           <ChevronRightIcon className="h-4 w-4" />
//           <span className="sr-only">Previous Page</span>
//         </a>
//       </Link>
//       <Link href="/books">
//         <a className={classNames(btn)}>
//           <ChevronDoubleRightIcon className="h-4 w-4" />
//           <span className="sr-only">Previous Page</span>
//         </a>
//       </Link>
//     </div>
//   )}
//   {tpc.length <= 8 &&
// tpc.map((t) => {
//   if (t === 0) {
//     return (
//       <Link href="/books">
//         <a className={classNames(btn)}>1</a>
//       </Link>
//     );
//   }
//   return (
//     <Link href={`/books?page=${t + 1}`}>
//       <a className={classNames(btn)}>{t + 1}</a>
//     </Link>
//   );
// }
// )}
