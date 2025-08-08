import {
  BookOpenIcon,
  UserIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

export function AdminDashboardQuickActions() {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg mb-8 border border-purple-900">
      <div className="px-6 py-4 border-b border-purple-900">
        <h2 className="text-lg font-medium text-purple-200">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/courses"
            className="flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg hover:border-blue-400 hover:bg-blue-900/40 focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors outline-none"
            tabIndex={0}
            aria-label="Upload Course"
          >
            <BookOpenIcon
              className="h-6 w-6 text-blue-300 mr-3"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-white">Upload Course</p>
              <p className="text-xs text-purple-300">
                Add new educational content
              </p>
            </div>
          </a>

          <a
            href="/admin/users"
            className="flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg hover:border-green-400 hover:bg-green-900/40 focus-visible:ring-2 focus-visible:ring-green-400 transition-colors outline-none"
            tabIndex={0}
            aria-label="Manage Users"
          >
            <UserIcon
              className="h-6 w-6 text-green-300 mr-3"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-white">Manage Users</p>
              <p className="text-xs text-purple-300">
                View and edit user accounts
              </p>
            </div>
          </a>

          <a
            href="/admin/analytics"
            className="flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg hover:border-purple-400 hover:bg-purple-900/40 focus-visible:ring-2 focus-visible:ring-purple-400 transition-colors outline-none"
            tabIndex={0}
            aria-label="View Analytics"
          >
            <ChartBarIcon
              className="h-6 w-6 text-purple-300 mr-3"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-white">View Analytics</p>
              <p className="text-xs text-purple-300">
                Check performance metrics
              </p>
            </div>
          </a>

          <button
            className="flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg hover:border-orange-400 hover:bg-orange-900/40 focus-visible:ring-2 focus-visible:ring-orange-400 transition-colors outline-none"
            aria-label="Send Signal"
          >
            <PaperAirplaneIcon
              className="h-6 w-6 text-orange-300 mr-3"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-white">Send Signal</p>
              <p className="text-xs text-purple-300">
                Broadcast trading signal
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
