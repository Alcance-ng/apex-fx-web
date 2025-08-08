import {
  ServerStackIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export function SuperAdminSystemAlerts() {
  return (
    <div className="mt-8 bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200 flex items-center gap-2">
          <ServerStackIcon
            className="h-5 w-5 text-red-300"
            aria-hidden="true"
          />
          System Alerts
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-red-900/30 border border-red-900 rounded-lg">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-100">
                High memory usage detected on Server 2
              </p>
              <p className="text-xs text-red-300">
                Memory usage: 89% - Consider scaling up
              </p>
            </div>
            <button className="text-red-300 text-sm hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded px-2 py-1">
              Investigate
            </button>
          </div>
          <div className="flex items-center p-3 bg-yellow-900/30 border border-yellow-900 rounded-lg">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-100">
                SSL certificate expires in 30 days
              </p>
              <p className="text-xs text-yellow-300">Domain: api.apex-fx.com</p>
            </div>
            <button className="text-yellow-300 text-sm hover:text-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded px-2 py-1">
              Renew
            </button>
          </div>
          <div className="flex items-center p-3 bg-blue-900/30 border border-blue-900 rounded-lg">
            <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-100">
                System backup completed successfully
              </p>
              <p className="text-xs text-blue-300">Last backup: 2 hours ago</p>
            </div>
            <button className="text-blue-300 text-sm hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-2 py-1">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
