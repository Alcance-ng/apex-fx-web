import {
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  subtextColor: string;
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  subtextColor,
}: StatCardProps) {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg p-6 border border-purple-900">
      <div className="flex items-center">
        <div className="p-2 bg-purple-900/60 rounded-lg">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-purple-300">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className={`text-xs ${subtextColor}`}>{subtext}</p>
        </div>
      </div>
    </div>
  );
}

interface AdminDashboardStatsProps {
  totalUsers: number;
  newUsersThisMonth: number;
  totalRevenue: number;
  activeSubscriptions: number;
  totalPlans?: number;
}

export function AdminDashboardStats({
  totalUsers,
  newUsersThisMonth,
  totalRevenue,
  activeSubscriptions,
  totalPlans,
}: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={
          <UserGroupIcon className="h-6 w-6 text-blue-300" aria-hidden="true" />
        }
        label="Total Users"
        value={totalUsers}
        subtext={`+${newUsersThisMonth} this month`}
        subtextColor="text-green-400"
      />
      <StatCard
        icon={
          <ChartBarIcon className="h-6 w-6 text-green-300" aria-hidden="true" />
        }
        label="Active Subscriptions"
        value={activeSubscriptions}
        subtext={`Total Plans: ${totalPlans ?? "-"}`}
        subtextColor="text-green-400"
      />
      <StatCard
        icon={
          <CurrencyDollarIcon
            className="h-6 w-6 text-purple-300"
            aria-hidden="true"
          />
        }
        label="Total Revenue"
        value={`₦${totalRevenue.toLocaleString()}`}
        subtext="(this month coming soon)"
        subtextColor="text-green-400"
      />
      <StatCard
        icon={
          <AcademicCapIcon
            className="h-6 w-6 text-orange-300"
            aria-hidden="true"
          />
        }
        label="Total Courses"
        value="24"
        subtext="2 new this week"
        subtextColor="text-blue-400"
      />
    </div>
  );
}
