import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
const SignUp = () => {
  /**
   * remeber me send something to api so we can do something like refresh token
   */
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup, isAuthenticated } = useAuth();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name || !email || !password || !confirmPassword)
      setError("All fields are required.");
    if (password !== confirmPassword) setError("Password do not match.");

    const data = await signup(name, email, password);
    if (data?.error) return setError(data?.error);
    router.push("/me");
    // get signup from authcontext pass in (name, email, password)
  };

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                ref={nameRef}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/* CONFIRM PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                ref={confirmPasswordRef}
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
      </div>
    </div>
  );
};

export default SignUp;
