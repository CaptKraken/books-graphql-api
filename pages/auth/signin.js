import SignIn from "@/components/SignIn";
import Link from "next/link";
const SignInPage = () => {
  /**
   * if(isAuth) redirect '/'
   */

  return (
    <div className="py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Internal Books
        </h2>
        <div className="text-center">
          <p>
            Do not have an account?{" "}
            <Link href="/auth/signup">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
