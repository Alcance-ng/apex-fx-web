import {
  ShieldCheckIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export function SuperAdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-red-900">
        <div className="flex items-center">
          <div className="p-2 bg-red-900/50 rounded-lg">
            <ShieldCheckIcon
              className="h-6 w-6 text-red-300"
              aria-hidden="true"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-red-300">System Health</p>
            <p className="text-2xl font-semibold text-white">99.9%</p>
            <p className="text-xs text-green-400">All systems operational</p>
          </div>
        </div>
      </div>
      <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-red-900">
        <div className="flex items-center">
          <div className="p-2 bg-red-900/50 rounded-lg">
            <UsersIcon className="h-6 w-6 text-blue-300" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-red-300">Total Admins</p>
            <p className="text-2xl font-semibold text-white">7</p>
            <p className="text-xs text-blue-400">2 active today</p>
          </div>
        </div>
      </div>
      <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-red-900">
        <div className="flex items-center">
          <div className="p-2 bg-red-900/50 rounded-lg">
            <CurrencyDollarIcon
              className="h-6 w-6 text-green-300"
              aria-hidden="true"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-red-300">Total Revenue</p>
            <p className="text-2xl font-semibold text-white">$2.4M</p>
            <p className="text-xs text-green-400">↗ +23% this quarter</p>
          </div>
        </div>
      </div>
      <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-red-900">
        <div className="flex items-center">
          <div className="p-2 bg-red-900/50 rounded-lg">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-yellow-300"
              aria-hidden="true"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-red-300">Active Issues</p>
            <p className="text-2xl font-semibold text-white">3</p>
            <p className="text-xs text-yellow-300">2 critical, 1 warning</p>
          </div>
        </div>
      </div>
    </div>
  );
}
