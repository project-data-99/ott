"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

import { updateProfile } from "@/store/slices/authSlice";
import { DummyUser } from "@/static/images";

// Initialize Uploader instance
const uploader = Uploader({
  apiKey: "free",
});

const AvatarUpdate = ({ auth }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

  // Handle file selection
  const handleFileSelect = async (files) => {
    if (!files.length) return;

    const fileUrl = files[0].fileUrl;

    // Fetch the file as a Blob
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const file = new File([blob], "avatar.jpg", { type: blob.type });

    setSelectedImage(file);

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // Upload Image
  const handleUploadComplete = async () => {
    if (!selectedImage) return alert("No image selected");

    try {
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("avatar", selectedImage);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update user profile in Redux
      dispatch(updateProfile(response.data.data));
      router.push("/profile");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar.");
    }
  };

  const avatarUrl = auth?.avatar
    ? `http://localhost:8000/${auth.avatar
        .replace(/\\/g, "/")
        .replace("public/", "")}`
    : DummyUser;

  return (
    <>
      <h3 className="heading mb-10">Update Avatar</h3>

      <div className="rounded-lg overflow-hidden w-[200px] h-[200px] flex items-center justify-center mb-5">
        <Image
          src={previewUrl || avatarUrl}
          alt="Avatar Preview"
          width={200}
          height={200}
        />
      </div>

      <UploadButton
        uploader={uploader}
        options={{ multi: false }}
        onComplete={handleFileSelect}
      >
        {({ onClick }) => (
          <button
            className={twMerge("button", "!py-2 !px-4 text-xs")}
            onClick={onClick}
          >
            Select Image
          </button>
        )}
      </UploadButton>

      <button
        className={twMerge("button mt-4", !selectedImage && "opacity-50")}
        onClick={handleUploadComplete}
        disabled={!selectedImage}
      >
        Upload
      </button>
    </>
  );
};

export default AvatarUpdate;
