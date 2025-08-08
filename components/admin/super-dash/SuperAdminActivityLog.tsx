interface ActivityItem {
  color: string;
  actor: string;
  action: string;
  time: string;
}

function ActivityLogItem({ color, actor, action, time }: ActivityItem) {
  return (
    <div className="flex items-start">
      <div
        className={`w-2 h-2 ${color} rounded-full mt-2 mr-3`}
        aria-hidden="true"
      ></div>
      <div className="flex-1">
        <p className="text-sm text-red-100">
          <span className="font-medium text-white">{actor}</span> {action}
        </p>
        <p className="text-xs text-red-300">{time}</p>
      </div>
    </div>
  );
}

export function SuperAdminActivityLog() {
  const activities: ActivityItem[] = [
    {
      color: "bg-green-400",
      actor: "Admin John",
      action: 'uploaded new course "Advanced Forex Strategies"',
      time: "2 hours ago",
    },
    {
      color: "bg-blue-400",
      actor: "Admin Sarah",
      action: "modified user permissions for 15 accounts",
      time: "4 hours ago",
    },
    {
      color: "bg-yellow-400",
      actor: "Admin Mike",
      action: "attempted to access super admin settings",
      time: "6 hours ago",
    },
    {
      color: "bg-red-400",
      actor: "System",
      action: "detected suspicious login attempts from unknown IP",
      time: "8 hours ago",
    },
  ];

  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200">Admin Activity Log</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((item, idx) => (
            <ActivityLogItem key={idx} {...item} />
          ))}
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
