import HeadHTML from "@/components/layout/Head";
import MeLayout from "@/components/layout/MeLayout";
import { getInitial } from "@/utils/client";
import { useAuth } from "context/AuthContext";
const MePage = () => {
  const { currentUser: user } = useAuth();

  /**
   * should do a me query instead for this
   */

  return (
    <>
      <HeadHTML title="My Profile" />
      <h2 className="w-full text-base sm:text-lg lg:text-2xl">My Infomation</h2>
      <dl className="w-full grid grid-cols-12 gap-4">
        <dt className="col-span-3 self-center">Profile Picture</dt>
        <dd className="col-span-9">
          {user?.profile_image && (
            <img
              src={user?.profile_image}
              alt="profile picture"
              className="w-24 h-24 rounded-full"
            />
          )}
          {!user?.profile_image && (
            <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center">
              <p className="text-4xl">{getInitial(user?.name)}</p>
            </div>
          )}
        </dd>
        <dt className="col-span-3">ID</dt>
        <dd className="col-span-9">{user?.id}</dd>
        <dt className="col-span-3">Role</dt>
        <dd className="col-span-9">{user?.role}</dd>
        <dt className="col-span-3">Name</dt>
        <dd className="col-span-9">{user?.name}</dd>
        <dt className="col-span-3">Email</dt>
        <dd className="col-span-9">{user?.email}</dd>
      </dl>
    </>
  );
};

MePage.getLayout = (page) => {
  return <MeLayout>{page}</MeLayout>;
};

export default MePage;
