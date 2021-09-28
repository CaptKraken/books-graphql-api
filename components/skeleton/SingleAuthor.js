import { BookOpenIcon } from "@heroicons/react/outline";
const SingleAuthor = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="w-full bg-indigo-100 p-2 rounded-md h-36 flex items-center gap-4 justify-center">
        <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center">
          <span className="text-4xl w-12 h-12 rounded-sm"></span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="h-4 w-8 bg-indigo-300"></p>
          <p className="h-4 w-24 bg-indigo-300"></p>
          <div className="bg-indigo-300 w-14 h-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            className="w-full flex gap-4 rounded-md overflow-hidden items-center relative border-2 col-span-2 lg:col-span-1 flex-col sm:flex-row"
            key={i}
          >
            <div className="w-full md:w-4/12 h-72 bg-indigo-300" />
            <div className="w-8/12 py-4 pr-2 flex flex-col gap-2">
              <p className="w-full h-6 bg-indigo-300 rounded-md"></p>
              <p className="w-24 h-4 bg-indigo-300 rounded-md"></p>
              <p className="w-16 h-4 bg-indigo-300 rounded-md"></p>
              <div className="flex gap-1">
                <p className="w-12 h-4 bg-indigo-300 rounded-md"></p>
                <div className="flex flex-col">
                  <p className="hover:underline w-24 h-4 bg-indigo-300 rounded-md"></p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="bg-indigo-300 hover:bg-indigo-400 px-3 rounded-tl-md w-24 h-8"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleAuthor;
