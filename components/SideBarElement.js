const SideBarElement = ({ title, children }) => {
  return (
    <div className="mt-2">
      <h2 className="text-base xs:text-lg sm:text-2xl font-bold mb-3">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default SideBarElement;
