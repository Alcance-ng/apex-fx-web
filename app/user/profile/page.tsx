import type { Metadata } from "next";
import Link from "next/link";
import ProfileDetails from "./ProfileDetails";

export const metadata: Metadata = {
  title: "Profile - Apex FX",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      <header className="bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-sm border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow">
            Profile Settings
          </h1>
          <Link
            href="/user/dashboard"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-lime-700/80 text-white font-semibold text-xs sm:text-sm md:text-base shadow hover:bg-lime-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 transition-colors"
            aria-label="Back to Dashboard"
          >
            &#8592; Dashboard
          </Link>
        </div>
      </header>
      <section
        className="max-w-4xl mx-auto px-4 py-8"
        aria-labelledby="profile-section-title"
      >
        <h2 id="profile-section-title" className="sr-only">
          Profile details
        </h2>
        <ProfileDetails />
      </section>
    </div>
  );
}
