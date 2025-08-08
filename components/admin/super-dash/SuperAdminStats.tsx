import {
  ShieldCheckIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  subtextColor: string;
  extra?: React.ReactNode;
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  subtextColor,
  extra,
}: StatCardProps) {
  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-red-900">
      <div className="flex items-center">
        <div className="p-2 bg-red-900/50 rounded-lg">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-red-300">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className={`text-xs ${subtextColor}`}>{subtext}</p>
          {extra && <div className="mt-1">{extra}</div>}
        </div>
      </div>
    </div>
  );
}

export interface SuperAdminStatsProps {
  totalUsers: number;
  newUsers: number;
  adminCount: number;
  totalRevenue?: number;
}

export function SuperAdminStats({
  totalUsers,
  newUsers,
  totalRevenue,
}: Omit<SuperAdminStatsProps, "adminCount">) {
  const revenue =
    typeof totalRevenue === "number"
      ? `₦${totalRevenue.toLocaleString()}`
      : "Coming soon";
  const revenueSubtext =
    typeof totalRevenue === "number" ? "(this month)" : "(coming soon)";

  const stats = [
    {
      icon: (
        <ShieldCheckIcon className="h-6 w-6 text-red-300" aria-hidden="true" />
      ),
      label: "System Health",
      value: "99.9%",
      subtext: "All systems operational",
      subtextColor: "text-green-400",
    },
    {
      icon: <UsersIcon className="h-6 w-6 text-blue-300" aria-hidden="true" />,
      label: "Total Users",
      value: totalUsers,
      subtext: `${newUsers} new this week`,
      subtextColor: "text-blue-400",
    },
    {
      icon: (
        <CurrencyDollarIcon
          className="h-6 w-6 text-green-300"
          aria-hidden="true"
        />
      ),
      label: "Total Revenue",
      value: revenue,
      subtext: revenueSubtext,
      subtextColor: "text-green-400",
    },
    {
      icon: (
        <ExclamationTriangleIcon
          className="h-6 w-6 text-yellow-300"
          aria-hidden="true"
        />
      ),
      label: "Active Issues",
      value: 3,
      subtext: "2 critical, 1 warning",
      subtextColor: "text-yellow-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
