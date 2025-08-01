import {
  CheckCircleIcon,
  SignalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import React from "react";

function RecentActivityItem({
  icon,
  text,
  time,
  iconColor,
}: {
  icon: React.ReactNode;
  text: string;
  time: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-3 border border-lime-400 hover:bg-lime-100 transition-colors duration-200 shadow-md">
      <span className={`mr-2 sm:mr-3 ${iconColor}`}>{icon}</span>
      <div className="flex-1">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-emerald-900 truncate max-w-[200px] sm:max-w-none">
          {text}
        </p>
        <p className="text-xs sm:text-xs md:text-sm lg:text-base text-lime-700 truncate max-w-[108px] sm:max-w-none">
          {time}
        </p>
      </div>
    </div>
  );
}

export function DashboardRecentActivity() {
  return (
    <div className="bg-gradient-to-br from-green-300 via-lime-400 to-emerald-200 rounded-xl shadow-lg border border-emerald-400">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-emerald-400">
        <h2 className="text-base sm:text-lg font-bold text-emerald-900">
          Recent Activity
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <RecentActivityItem
            icon={<SignalIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            text="New signal: EUR/USD Buy"
            time="2 hours ago"
            iconColor="text-lime-600"
          />
          <RecentActivityItem
            icon={<CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            text="Course completed: Advanced Technical Analysis"
            time="1 day ago"
            iconColor="text-green-600"
          />
          <RecentActivityItem
            icon={<ArrowPathIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            text="Monthly subscription renewed"
            time="3 days ago"
            iconColor="text-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
