import {
  BookOpenIcon,
  UserIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import AdminQuickActionCard from "@/components/admin/AdminQuickActionCard";

export function AdminDashboardQuickActions() {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg mb-8 border border-purple-900">
      <div className="px-6 py-4 border-b border-purple-900">
        <h2 className="text-lg font-medium text-purple-200">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminQuickActionCard
            icon={
              <BookOpenIcon
                className="h-6 w-6 text-blue-300 mr-3"
                aria-hidden="true"
              />
            }
            label="Upload Course"
            description="Add new educational content"
            color="blue"
            href="/admin/courses"
            ariaLabel="Upload Course"
          />
          <AdminQuickActionCard
            icon={
              <UserIcon
                className="h-6 w-6 text-green-300 mr-3"
                aria-hidden="true"
              />
            }
            label="Manage Users"
            description="View and edit user accounts"
            color="green"
            href="/admin/users"
            ariaLabel="Manage Users"
          />
          <AdminQuickActionCard
            icon={
              <ChartBarIcon
                className="h-6 w-6 text-purple-300 mr-3"
                aria-hidden="true"
              />
            }
            label="View Analytics"
            description="Check performance metrics"
            color="purple"
            href="/admin/analytics"
            ariaLabel="View Analytics"
          />
          <AdminQuickActionCard
            icon={
              <PaperAirplaneIcon
                className="h-6 w-6 text-orange-300 mr-3"
                aria-hidden="true"
              />
            }
            label="Send Signal"
            description="Broadcast trading signal"
            color="orange"
            onClick={() => alert("Send Signal action")}
            ariaLabel="Send Signal"
          />
        </div>
      </div>
    </div>
  );
}
