import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMailOutline, IoPhonePortraitOutline } from "react-icons/io5";

import { DummyUser } from "@/static/images";

const ProfileCard = ({ user }) => {
  const avatarUrl = user?.avatar
    ? `http://localhost:8000/${user.avatar
        .replace(/\\/g, "/")
        .replace("public/", "")}`
    : DummyUser;

  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <div className="bg-darkAlt sticky top-10 rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-start gap-5">
                    <Image
                      src={avatarUrl}
                      alt={user.firstName}
                      width="100"
                      height="100"
                      className="rounded-lg"
                    />
                    <div>
                      <h2 className="mb-2 flex items-center gap-2">
                        <span className="text-xl font-bold text-light ">
                          {user.firstName} {user?.lastName}
                        </span>
                        <FaCircleCheck
                          className={twMerge(
                            "text-primary text-sm",
                            !user.is_verified && "text-gray-500"
                          )}
                        />
                      </h2>
                      <p className="flex items-center gap-3">
                        <IoMailOutline className="text-light text-lg" />
                        <Link
                          className="text-primary text-sm"
                          href={`mailto:${user.email}`}
                        >
                          {user.email}
                        </Link>
                      </p>
                      <p className="flex items-center gap-3 mt-3">
                        <IoPhonePortraitOutline className="text-light text-lg" />
                        <span className="text-primary text-sm">
                          {user.phoneNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-gray-800">
                  <ul className="flex items-center flex-wrap gap-4">
                    <li>
                      <Link
                        href="/profile/update-profile"
                        className="text-sm text-light transition duration-500 hover:text-primary"
                      >
                        Update Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile/change-password"
                        className="text-sm text-light transition duration-500 hover:text-primary"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li className="ml-auto">
                      <Link
                        href="/profile/change-password"
                        className="text-sm text-red-500"
                      >
                        Delete Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-center p-4 bg-dark border border-solid border-primary rounded-lg">
                <h5 className="heading mb-4">Subscribe Now!</h5>
                <p className="mb-5">
                  Get unlimited access to premium content with our 5 Rs
                  subscription — your gateway to entertainment!
                </p>
                <Link href="/subscriptions" className="button">
                  Subscribe Now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
