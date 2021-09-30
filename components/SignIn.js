import { XIcon } from "@heroicons/react/outline";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { isAuthenticated, login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      return setError("Please fill both fields.");
    }
    setError("");
    const data = await login(email, password);
    if (data?.error) return setError(data.error);
    // return router.push("/me");
  };

  if (isAuthenticated) router.push("/");

  return (
    <div className="sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {error && (
        <div className="my-2 rounded-md overflow-hidden">
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 relative"
            role="alert"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold">Error</p>
              <button onClick={() => setError("")}>
                <XIcon className="w-4 h-4 hover:text-red-400" />
              </button>
            </div>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white py-8 px-4 sm:shadow sm:rounded-lg sm:px-6">
        {/* {error && <p>PUT ERROR HERE</p>} */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex mt-2 justify-end">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SignIn;
