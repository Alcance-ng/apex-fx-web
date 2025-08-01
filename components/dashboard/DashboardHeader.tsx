"use client";
import { useAuthStore } from "@/lib/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function DashboardHeader() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  useEffect(() => {
    console.log("DashboardHeader user:", user);
  }, [user]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  // (simple implementation, can be improved with useEffect)
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };

  return (
    <header className="bg-emerald-900 shadow-sm border-b border-lime-700 p-4">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4 px-4">
        <h1 className="text-base sm:text-2xl font-bold text-lime-400">
          Welcome {user?.name?.split(" ")[0] || "User"}
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div
            className="relative"
            tabIndex={0}
            ref={dropdownRef}
            onBlur={handleBlur}
          >
            <button
              className="w-12 h-12 bg-lime-700 rounded-full flex items-center justify-center text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label="User menu"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              {/* User icon (SVG) always visible */}
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-lime-200 z-50 py-2">
                <div className="px-4 py-2 border-b border-lime-100">
                  <span className="block text-sm font-semibold text-lime-700 truncate">
                    {user?.name || "User"}
                  </span>
                  <span className="block text-xs text-lime-400 truncate">
                    {user?.role || "Member"}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    clearUser();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-100 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
