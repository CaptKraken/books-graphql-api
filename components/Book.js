import Image from "next/image";
import Link from "next/link";
const fallbackImg =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1594616847";
const Book = ({ book }) => {
  let authors = "";
  book?.authors.map((author, i) => {
    i === book.authors.length
      ? (authors += author.name + ", ")
      : (authors += author.name);
  });

  return (
    <Link href={`/books/${book?.id}`}>
      <a title={book.title}>
        <div className="hover:scale-105 transition-all rounded-md relative">
          <div className="rounded-md">
            <Image
              src={book.image_url || fallbackImg}
              width="430"
              height="700"
              className="rounded-md"
            ></Image>
          </div>
          <div className="absolute bottom-1 rounded-md w-full p-4 bg-gradient-to-t from-green-700 to-transparent h-40 flex flex-col justify-end md:rounded-b-md">
            <h3 className="text-base text-white truncate">{book.title}</h3>
            <p className="text-sm text-gray-200">{authors}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Book;
