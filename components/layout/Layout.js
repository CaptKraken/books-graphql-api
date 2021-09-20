import Footer from "./Footer";
import HeadHTML from "./Head";
import Navigation from "./Navigation";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeadHTML />
      <header>
        <Navigation />
      </header>
      <main className="w-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl w-full py-4 px-2 sm:px-4 lg:px-8 mx-auto">
          {children}
        </div>
      </main>
      <footer className="mt-auto p-4 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutWrapper;
