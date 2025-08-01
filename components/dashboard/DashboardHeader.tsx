import { useState } from "react";
import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

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

  return (
    <header className="bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 border-b border-lime-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="rounded-xl backdrop-blur-md bg-white/10 shadow flex flex-wrap items-center justify-between px-6 py-6">
          <span
            className="text-base sm:text-lg md:text-xl font-semibold text-lime-100 drop-shadow"
            id="dashboard-greeting"
          >
            {greeting}
          </span>
          <div className="relative flex items-center">
            <button
              aria-label="Profile menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              tabIndex={0}
              className="flex items-center gap-1"
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              <span className="w-9 h-9 bg-lime-700/80 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-400 border border-lime-400">
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
                <a
                  href="/profile"
                  className="flex items-center w-full px-4 py-2 text-sm text-lime-700 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none"
                  role="menuitem"
                  tabIndex={0}
                >
                  <span className="h-5 w-5 mr-2 flex items-center justify-center text-lime-700 font-bold">
                    {getFirstName().charAt(0).toUpperCase()}
                  </span>
                  Profile
                </a>
                <a
                  href="/settings"
                  className="flex items-center w-full px-4 py-2 text-sm text-lime-700 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none"
                  role="menuitem"
                  tabIndex={0}
                >
                  <ChevronDownIcon className="h-5 w-5 mr-2 text-lime-700" />
                  Settings
                </a>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-lime-700 hover:bg-lime-50 focus:bg-lime-100 focus:outline-none"
                  onClick={onLogout}
                  role="menuitem"
                  tabIndex={0}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-lime-700" />
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
