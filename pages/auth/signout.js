import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
const SignOut = () => {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.push("/");
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h2 className='text-lg xs:text-2xl'>Signing you out</h2>
      <DotsHorizontalIcon className="w-2/6 animate-bounce text-gray-700" />
    </div>
  );
};

export default SignOut;
