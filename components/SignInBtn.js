import { LoginIcon } from "@heroicons/react/outline";
import Link from "next/link";
const SignInBtn = () => {
  return (
    <Link href="/auth/signin">
      <a className="ml-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <LoginIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
        <span className="hidden lg:ml-2 md:inline-block">Sign In</span>
      </a>
    </Link>
  );
};

export default SignInBtn;
