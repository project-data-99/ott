"use client";

import { useSelector } from "react-redux";

import { AvatarUpdate, ProfileUpdate } from "@/sections/profile";

const UpdateProfilePage = () => {
  const auth = useSelector((state) => state.auth.user);

  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8">
              <ProfileUpdate auth={auth} />
            </div>
            <div className="col-span-4">
              <AvatarUpdate auth={auth} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfilePage;
