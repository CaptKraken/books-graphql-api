import { SearchIcon } from "@heroicons/react/outline";
const AllAuthors = () => {
  return (
    <div className="mb-4 animate-pulse">
      <div className="w-full gap-4">
        <h2 className="text-base mb-2 xs:text-lg sm:text-2xl font-bold bg-indigo-400 w-36 rounded-md">
          &nbsp;
        </h2>
        <div className="w-full mb-4 rounded-md flex items-center relative">
          <div className="absolute top-4 left-12 h-4 w-52 bg-indigo-400 rounded-md"></div>
          <SearchIcon className="w-6 h-6 absolute left-2 text-gray-400" />
          <div className="w-full h-12 p-4 pl-10 bg-indigo-100 rounded-md" />
        </div>
        <div className="grid 2xs:grid-cols-2 ms:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="bg-indigo-200 px-4 py-2 rounded-md text-xs xs:text-sm h-full flex flex-col gap-2"
            >
              <p className="w-24 h-4 bg-indigo-400 rounded-md"></p>
              <div className="w-12 h-4 bg-indigo-400 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAuthors;
