import { plural } from "@/utils/client";
import { HeartIcon } from "@heroicons/react/outline";
import Link from "next/link";
const BookCard = ({ book }) => {
  if (!book) return;
  const img = book.image_url;
  /**
   * CHECK IF FAVORITE:
   *
   * compare book.id with current user's list
   *
   */

  return (
    <div className="w-full flex gap-4 rounded-md overflow-hidden items-center relative border-2 flex-row">
      <img
        src={img}
        alt={book?.title}
        className="w-4/12 md:w-6/12 lg:w-4/12 ms:h-62 md:h-72"
      />
      <div className="w-8/12 xs:mb-4">
        <button className="absolute top-2 right-2 z-50">
          <HeartIcon className="w-6 h-6 text-black hover:text-red-500" />
        </button>
        <p className="text-xs xs:text-base sm:text-xl md:text-base xl:text-xl">
          {book.title}
        </p>
        <p className="text-xs xs:text-sm sm:text-base md:text-sm xl:text-base">
          {book.page_count} pages
        </p>
        <p className="text-xs xs:text-sm sm:text-base md:text-sm xl:text-base">
          {book.published}
        </p>
        <div className="flex gap-1">
          <div className="flex flex-col">
            {book?.authors &&
              book?.authors.map((author) => (
                <Link href={`/authors/${author.id}`} key={author.id}>
                  <a className="hover:underline text-xs xs:text-sm sm:text-base md:text-sm xl:text-base">
                    {author.name}
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div className="mt-2 2xs:hidden">
          <Link href={`/books/${book.id}`}>
            <a className="bg-indigo-300 text-xs md:text-base hover:bg-indigo-400 py-1 px-2 rounded-md">
              View Book
            </a>
          </Link>
        </div>
      </div>
      <div className="hidden 2xs:block absolute -bottom-1 right-0 py-2">
        <Link href={`/books/${book.id}`}>
          <a className="bg-indigo-300 text-xs sm:text-base hover:bg-indigo-400 py-2 px-3 rounded-tl-md">
            View Book
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
