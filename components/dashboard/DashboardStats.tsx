import {
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import React from "react";

function DashboardStatCard({
  icon,
  label,
  value,
  bgColor,
  iconBgColor,
  borderColor,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  iconBgColor: string;
  borderColor: string;
  iconColor: string;
}) {
  return (
    <div
      className={`rounded-xl shadow-lg p-2 sm:p-6 border group flex flex-col justify-center min-h-[90px] sm:min-h-[150px] hover:shadow-2xl transition-shadow duration-300 ${bgColor} ${borderColor}`}
    >
      <div className="flex items-center">
        <div
          className={`p-3 rounded-xl group-hover:brightness-110 transition-colors duration-300 flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
        <div className="ml-4 sm:ml-6 flex-1">
          <p
            className={`text-xs sm:text-base lg:text-lg font-semibold ${iconColor} truncate`}
          >
            {label}
          </p>
          <p
            className={`text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${iconColor.replace(
              "700",
              "900"
            )} truncate`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 w-full">
      <DashboardStatCard
        icon={<ChartBarIcon className="w-8 h-8 text-lime-700" />}
        label="Active Signals"
        value="12"
        bgColor="bg-gradient-to-br from-lime-200 via-lime-300 to-lime-400"
        iconBgColor="bg-lime-300"
        borderColor="border-lime-300"
        iconColor="text-lime-700"
      />
      <DashboardStatCard
        icon={<CurrencyDollarIcon className="w-8 h-8 text-lime-700" />}
        label="This Month P&L"
        value="+$2,450"
        bgColor="bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300"
        iconBgColor="bg-lime-200"
        borderColor="border-lime-200"
        iconColor="text-lime-700"
      />
      <DashboardStatCard
        icon={<AcademicCapIcon className="w-8 h-8 text-lime-700" />}
        label="Courses Completed"
        value="3/8"
        bgColor="bg-gradient-to-br from-lime-300 via-lime-500 to-lime-300"
        iconBgColor="bg-lime-200"
        borderColor="border-lime-200"
        iconColor="text-lime-700"
      />
    </div>
  );
}
