"use client";
import { useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileDetails() {
  const { data: session, status } = useSession();
  const user = session?.user as {
    name: string;
    email: string;
    // phone?: string;
    // bio?: string;
    image?: string;
  };
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <span className="text-white text-lg">
          You must be logged in to view this section.
        </span>
      </div>
    );
  }

  const profilePicture =
    typeof user.image === "string" && user.image.length > 0 ? user.image : null;

  return (
    <div className="rounded-xl shadow-lg mb-8 border border-white/10 bg-white/10 backdrop-blur-md">
      <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-green-900/60 via-emerald-900/60 to-lime-900/60 rounded-t-xl">
        <h2 className="text-lg font-semibold text-white">
          Personal Information
        </h2>
        <p className="text-sm text-lime-200">View your profile details.</p>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-lime-400 via-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-lime-200 overflow-hidden">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <UserIcon className="h-12 w-12 text-lime-900" />
            )}
          </div>
          <div>
            <div className="text-xl font-bold text-white">{user.name}</div>
            <div className="text-sm text-lime-200">{user.email}</div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="block text-xs font-medium text-lime-300 mb-1">
              Phone
            </span>
            <span className="block text-base text-lime-100">{user.phone}</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-lime-300 mb-1">
              Bio
            </span>
            <span className="block text-base text-lime-100">{user.bio}</span>
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          <Link
            href="#"
            className="px-4 py-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-green-700 text-white rounded-md text-center font-semibold shadow transition-all motion-safe:hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
          >
            Update Profile
          </Link>
          <button
            type="button"
            onClick={() => setShowChangePassword(true)}
            className="px-4 py-2 border-2 border-lime-400 text-white rounded-md text-center font-semibold bg-emerald-900/60 hover:bg-lime-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            aria-haspopup="dialog"
            aria-expanded={showChangePassword}
            aria-controls="change-password-modal"
          >
            Change Password
          </button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-center font-semibold shadow transition-all motion-safe:hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label="Sign out of your account"
          >
            Logout
          </button>
        </div>
        <ChangePasswordModal
          open={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
      </div>
    </div>
  );
}
