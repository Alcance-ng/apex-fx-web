import {
  UserIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleTags: string[];
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminDashboardRecentUsersProps {
  users: User[];
}

export function AdminDashboardRecentUsers({
  users,
}: AdminDashboardRecentUsersProps) {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg border border-purple-900">
      <div className="px-6 py-4 border-b border-purple-900">
        <h2 className="text-lg font-medium text-purple-200">Recent Users</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {users.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600/80 rounded-full flex items-center justify-center shadow-md">
                  <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-purple-300">{user.email}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/60 text-green-300">
                {user.isEmailVerified ? (
                  <CheckCircleIcon
                    className="h-4 w-4 mr-1 text-green-300"
                    aria-hidden="true"
                  />
                ) : (
                  <ExclamationCircleIcon
                    className="h-4 w-4 mr-1 text-yellow-300"
                    aria-hidden="true"
                  />
                )}
                {user.isEmailVerified ? "Active" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="/admin/users"
            className="text-blue-300 text-sm hover:text-blue-400 focus-visible:underline outline-none"
            aria-label="View all users"
          >
            View all users →
          </a>
        </div>
      </div>
    </div>
  );
}
