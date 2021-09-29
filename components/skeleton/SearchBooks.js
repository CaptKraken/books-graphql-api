const SearchBooks = () => {
  return (
    <div className="px-2 flex flex-col gap-4 animate-pulse">
      <h2 className="text-base xs:text-lg sm:text-2xl font-bold bg-gray-500 w-32 rounded-md">
        &nbsp;
      </h2>
      <div className="grid gap-4 grid-cols-2 2xs:grid-cols-3 lg:grid-cols-4 bg-gray-500 p-2 rounded-md">
        <div className="w-full bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
        <div className="w-full bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
        <div className="w-full bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
        <div className="w-full bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
        <div className="w-full hidden xs:block bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
        <div className="w-full hidden xs:block bg-gray-400 h-28 2xs:h-32 xs:h-36 ms:h-52 sm:h-72 lg:h-80 rounded-md">
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
