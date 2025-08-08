import {
  UserGroupIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export function SuperAdminCriticalActions() {
  return (
    <div className="bg-[#2a0f1a]/50 backdrop-blur-md rounded-lg border border-red-900 p-6 mb-8">
      <h2 className="text-lg font-bold text-red-200 mb-4 flex items-center gap-2">
        <ExclamationTriangleIcon
          className="h-5 w-5 text-yellow-300"
          aria-hidden="true"
        />
        Critical System Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="/super-admin/admins"
          className="flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <UserGroupIcon className="h-5 w-5 text-blue-300 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-200">Manage Admins</p>
            <p className="text-xs text-red-300">Add/remove admin access</p>
          </div>
        </a>
        <a
          href="/super-admin/settings"
          className="flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Cog6ToothIcon className="h-5 w-5 text-red-300 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-200">System Settings</p>
            <p className="text-xs text-red-300">Configure global settings</p>
          </div>
        </a>
        <a
          href="/super-admin/logs"
          className="flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <DocumentTextIcon className="h-5 w-5 text-purple-300 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-200">System Logs</p>
            <p className="text-xs text-red-300">View all system activity</p>
          </div>
        </a>
        <button className="flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
          <ArrowPathIcon className="h-5 w-5 text-green-300 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-200">System Backup</p>
            <p className="text-xs text-red-300">Create full system backup</p>
          </div>
        </button>
      </div>
    </div>
  );
}
