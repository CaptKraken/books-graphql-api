import HeadHTML from "@/components/layout/Head";
import MeLayout from "@/components/layout/MeLayout";
import { useAuth } from "context/AuthContext";
import { fetchFromAPI, getInitial } from "@/utils/client";
import { useEffect, useRef, useState } from "react";
import { ArrowCircleUpIcon, XIcon } from "@heroicons/react/outline";
import Modal from "@/components/Modal";
import { useQuery } from "@apollo/client";

const SettingsPage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [user, setUser] = useState(currentUser);
  const [updatedData, setUpdatedData] = useState({});
  const [verified, setVerfied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const fileRef = useRef();

  const handleRemoveProfilePicture = () => {
    if (user.profile_image === currentUser.profile_image) {
      return setUser((prev) => {
        return {
          ...prev,
          profile_image: null,
        };
      });
    }

    return setUser((prev) => {
      return {
        ...prev,
        profile_image: currentUser.profile_image,
      };
    });
  };

  const handleProfilePreview = (e) => {
    const file = e?.target?.files[0];
    console.log(file.name);
    if (!file) return;
    const previewProfile = URL.createObjectURL(file);
    setUser((prev) => {
      return { ...prev, profile_image: previewProfile };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const profile_image = fileRef?.current?.files[0] || null;
    const data = {
      email,
      name,
      password,
    };
    setVerfied(false);
    setUpdatedData(data);
    setOpenModal(true);
  };

  // TODO: do a check from here if profile_image

  useEffect(() => {
    if (verified) {
      setLoading(true);
      const file = fileRef?.current?.files[0];
      const uploadToCloudinary = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "internal_books_profile");

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
          method: "POST",
          body: data,
        });

        const response = await res.json();
        return response.secure_url;
      };

      const updateprofile = async () => {
        const query = `
        mutation EditMeMutation($editMeInput: MeInput!) {
          user:editMe(input: $editMeInput) {
            id
            name
            email
            role
            profile_image
          }
        }
          `;

        const variables = {
          editMeInput: {
            ...updatedData,
            profile_image: file
              ? await uploadToCloudinary()
              : user.profile_image ?? null,
          },
        };
        const data = await fetchFromAPI(query, variables);
        console.log(data);
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      };
      updateprofile().then(() => {
        setLoading(false);
        emailRef.current.value = user.email;
        nameRef.current.value = user.name;
        passwordRef.current.value = "";
        fileRef.current.value = null;
        setUpdatedData({});
      });
    }
  }, [verified]);

  return (
    <>
      <HeadHTML title="Profile Settings" />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        headerText="Update Profile"
        contentText="Please Input your password to for verification."
        yesText="Verify"
        noText="Cancel"
        setVerfied={setVerfied}
      />
      <div className="flex ms:flex-row ms:items-center ms:justify-start mb-4">
        <h2 className="w-full text-2xl">Profile Settings</h2>

        <div className="hidden ms:flex gap-2 items-center">
          <button
            type="submit"
            form="update-profile"
            className="px-3 py-1 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 rounded-md"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading && (
              <p className="flex items-center justify-center gap-2">
                <ArrowCircleUpIcon className="w-5 h-5 animate-spin" />
                <span>Updating</span>
              </p>
            )}
            {!loading && <span>Update Profile</span>}
          </button>
          <button
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
      <form
        className="w-full grid grid-cols-12 gap-2 ms:gap-4"
        id="update-profile"
        onSubmit={handleUpdate}
      >
        <p className="hidden sm:block col-span-3 text-gray-300 self-center">
          Profile Picture
        </p>
        <div className="col-span-12 sm:col-span-9 flex gap-4 items-center">
          <div className="w-24 h-24 relative">
            {user?.profile_image ? (
              <>
                <img
                  src={user?.profile_image}
                  alt="profile picture"
                  className="w-24 h-24 rounded-full"
                />
                <button
                  className="absolute top-0 right-0"
                  onClick={handleRemoveProfilePicture}
                >
                  <XIcon className="w-6 h-6 text-red-600 hover:text-red-700 bg-red-200 hover:bg-red-300 rounded-full" />
                </button>
              </>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center">
                <p className="text-4xl">{getInitial(user?.name)}</p>
              </div>
            )}
          </div>
          <label
            htmlFor="profile-picture"
            role="button"
            className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md"
          >
            Upload
          </label>
          <input
            ref={fileRef}
            type="file"
            id="profile-picture"
            name="profile-picture"
            className="hidden"
            accept="image/*"
            multiple={false}
            onChange={handleProfilePreview}
            formEncType="multi"
          />
        </div>

        <p className="col-span-4 2xs:col-span-3 text-gray-300">ID</p>
        <p className="col-span-8 2xs:col-span-9">{user?.id}</p>
        <p className="col-span-4 2xs:col-span-3 text-gray-300">Role</p>
        <p className="col-span-8 2xs:col-span-9">{user?.role}</p>
        <label
          htmlFor="name"
          className="col-span-12 sm:col-span-3 text-gray-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={user?.name}
          className="text-black px-3 py-1 rounded-md w-full col-span-12 sm:col-span-9"
          autoComplete="name"
        />
        <label
          htmlFor="email"
          className="col-span-12 sm:col-span-3 text-gray-300"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          defaultValue={user?.email}
          className="text-black px-3 py-1 rounded-md w-full col-span-12 sm:col-span-9"
          autoComplete="email"
        />
        <label
          htmlFor="new-password"
          className="col-span-12 sm:col-span-3 text-gray-300"
        >
          New Password
        </label>

        <input
          id="new-password"
          type="password"
          ref={passwordRef}
          className="text-black px-3 py-1 rounded-md w-full col-span-12 sm:col-span-9"
          autoComplete="new-password"
        />
        <div className="col-span-12 flex ms:hidden gap-4 mt-8 w-full justify-center">
          <button
            type="submit"
            className="px-3 py-1 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 rounded-md flex-1 "
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading && (
              <p className="flex items-center justify-center gap-2">
                <ArrowCircleUpIcon className="w-5 h-5 animate-spin" />
                <span>Updating</span>
              </p>
            )}
            {!loading && <span>Update Profile</span>}
          </button>
          <button
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md flex-1"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

SettingsPage.getLayout = (page) => {
  return <MeLayout>{page}</MeLayout>;
};

export default SettingsPage;
