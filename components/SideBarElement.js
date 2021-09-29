import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
const SideBarElement = ({ title, href, children }) => {
  return (
    <div className="my-2">
      <div className="flex gap-2 items-baseline mb-3">
        <h2 className="text-sm xs:text-base ms:text-2xl md:text-xl lg:text-2xl font-bold">
          {title}
        </h2>
        {href && (
          <Link href={href}>
            <a className="flex text-xs xs:text-sm md:text-base items-center group text-gray-500">
              <span>View All </span>
              <ChevronDoubleRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-all" />
            </a>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default SideBarElement;
