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
            label="Courses"
            description="Add new educational content"
            color="blue"
            href="/admin/courses"
            ariaLabel="Upload Course"
            hoverClass="hover:scale-105 hover:shadow-xl hover:bg-blue-900/30"
          />
          <AdminQuickActionCard
            icon={
              <UserIcon
                className="h-6 w-6 text-green-300 mr-3"
                aria-hidden="true"
              />
            }
            label="Users"
            description="View and edit user accounts"
            color="green"
            href="/admin/users"
            ariaLabel="Manage Users"
            hoverClass="hover:scale-105 hover:shadow-xl hover:bg-green-900/30"
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
            hoverClass="hover:scale-105 hover:shadow-xl hover:bg-purple-900/30"
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
            href="/admin/signal"
            ariaLabel="Send Signal"
            hoverClass="hover:scale-105 hover:shadow-xl hover:bg-orange-900/30"
          />
        </div>
      </div>
    </div>
  );
}
