import {
  UserIcon,
  CreditCardIcon,
  ChartBarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import React from "react";

function DashboardQuickActionCard({
  icon,
  label,
  href,
  borderColor,
  hoverBg,
  iconColor,
  labelColor,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  borderColor: string;
  hoverBg: string;
  iconColor: string;
  labelColor: string;
}) {
  return (
    <a
      href={href}
      className={`flex items-center p-3 sm:p-4 border rounded-xl transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-lime-500 ${borderColor} ${hoverBg} bg-white/60 sm:bg-transparent shadow-sm sm:shadow-none`}
      tabIndex={0}
      aria-label={label}
    >
      <span className={`mr-2 sm:mr-3 ${iconColor}`}>{icon}</span>
      <span
        className={`text-xs sm:text-sm lg:text-base font-medium ${labelColor} truncate`}
      >
        {label}
      </span>
    </a>
  );
}

export function DashboardQuickActions() {
  return (
    <div className="bg-gradient-to-br from-green-500/90 via-emerald-400/40 to-lime-300 rounded-xl shadow mb-8 border border-lime-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-lime-200">
        <h2 className="text-base sm:text-lg font-medium text-lime-900">
          Quick Actions
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <DashboardQuickActionCard
            icon={<ChartBarIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            label="Manage Subscriptions"
            href="/subscriptions"
            borderColor="border-lime-200"
            hoverBg="hover:bg-lime-50"
            iconColor="text-lime-700"
            labelColor="text-lime-900"
          />
          <DashboardQuickActionCard
            icon={<AcademicCapIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            label="Browse Courses"
            href="/courses"
            borderColor="border-green-200"
            hoverBg="hover:bg-green-50"
            iconColor="text-green-700"
            labelColor="text-green-900"
          />
          <DashboardQuickActionCard
            icon={<CreditCardIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            label="View Transactions"
            href="/transactions"
            borderColor="border-emerald-200"
            hoverBg="hover:bg-emerald-50"
            iconColor="text-emerald-700"
            labelColor="text-emerald-900"
          />
          <DashboardQuickActionCard
            icon={<UserIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            label="Edit Profile"
            href="/profile"
            borderColor="border-lime-200"
            hoverBg="hover:bg-lime-50"
            iconColor="text-lime-700"
            labelColor="text-lime-900"
          />
        </div>
      </div>
    </div>
  );
}
