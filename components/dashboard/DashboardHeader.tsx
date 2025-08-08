import { useState } from "react";
import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface DashboardUser {
  firstName?: string;
  name?: string;
}

export function DashboardHeader({
  user,
  onLogout,
}: {
  user: DashboardUser;
  onLogout: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const getFirstName = () => {
    if (user.firstName) return user.firstName;
    if (user.name) return user.name.split(" ")[0];
    return "User";
  };
  const greeting = `Welcome back, ${getFirstName()}!`;

  const menuItems = [
    {
      type: "link" as const,
      href: "/user/profile",
      icon: (
        <span className="h-5 w-5 mr-2 flex items-center justify-center text-lime-200 font-bold">
          {getFirstName().charAt(0).toUpperCase()}
        </span>
      ),
      label: "Profile",
    },
    {
      type: "link" as const,
      href: "/settings",
      icon: <ChevronDownIcon className="h-5 w-5 mr-2 text-lime-300" />,
      label: "Settings",
    },
    {
      type: "button" as const,
      onClick: onLogout,
      icon: (
        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-lime-300" />
      ),
      label: "Logout",
    },
  ];

  return (
    <header className="relative z-10 bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="rounded-xl backdrop-blur-md bg-white/10 shadow flex flex-wrap items-center justify-between px-6 py-6">
          <span
            className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow"
            id="dashboard-greeting"
          >
            {greeting}
          </span>
          <div className="relative flex items-center">
            <button
              aria-label="Profile menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 rounded"
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              <span className="w-9 h-9 bg-lime-700/80 rounded-full flex items-center justify-center shadow-lg border border-lime-400">
                <span className="text-lime-100 text-lg font-bold">
                  {getFirstName().charAt(0).toUpperCase()}
                </span>
              </span>
              <ChevronDownIcon className="h-4 w-4 text-lime-200" />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl z-50 py-2 border border-lime-100"
                role="menu"
                aria-label="Profile actions"
              >
                {menuItems.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center w-full px-4 py-2 text-sm text-lime-700 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                      role="menuitem"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      className="flex items-center w-full px-4 py-2 text-sm text-lime-700 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                      onClick={item.onClick}
                      role="menuitem"
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
