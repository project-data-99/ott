"use client";

import { useSelector } from "react-redux";

import { ProfileCard } from "@/sections/profile";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <ProfileCard user={auth.user} />
    </>
  );
};

export default ProfilePage;
