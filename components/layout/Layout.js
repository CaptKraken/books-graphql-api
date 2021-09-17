import HeadHTML from "./Head";
import Header from "./Header";

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <HeadHTML />
      <Header />
      {children}
    </>
  );
};

export default LayoutWrapper;
