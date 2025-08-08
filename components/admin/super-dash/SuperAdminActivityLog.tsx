export function SuperAdminActivityLog() {
  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200">Admin Activity Log</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div
              className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"
              aria-hidden="true"
            ></div>
            <div className="flex-1">
              <p className="text-sm text-red-100">
                <span className="font-medium text-white">Admin John</span>{" "}
                uploaded new course &quot;Advanced Forex Strategies&quot;
              </p>
              <p className="text-xs text-red-300">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"
              aria-hidden="true"
            ></div>
            <div className="flex-1">
              <p className="text-sm text-red-100">
                <span className="font-medium text-white">Admin Sarah</span>{" "}
                modified user permissions for 15 accounts
              </p>
              <p className="text-xs text-red-300">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"
              aria-hidden="true"
            ></div>
            <div className="flex-1">
              <p className="text-sm text-red-100">
                <span className="font-medium text-white">Admin Mike</span>{" "}
                attempted to access super admin settings
              </p>
              <p className="text-xs text-red-300">6 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"
              aria-hidden="true"
            ></div>
            <div className="flex-1">
              <p className="text-sm text-red-100">
                <span className="font-medium text-white">System</span> detected
                suspicious login attempts from unknown IP
              </p>
              <p className="text-xs text-red-300">8 hours ago</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/super-admin/logs"
            className="text-red-300 text-sm hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
          >
            View full activity log →
          </a>
        </div>
      </div>
    </div>
  );
}
