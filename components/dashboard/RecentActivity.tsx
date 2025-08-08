import { ChartBarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

const activities = [
  {
    icon: ChartBarIcon,
    color: "bg-lime-500",
    title: "New signal: EUR/USD Buy",
    time: "2 hours ago",
  },
  {
    icon: AcademicCapIcon,
    color: "bg-lime-400",
    title: "Course completed: Advanced Technical Analysis",
    time: "1 day ago",
  },
  {
    icon: ChartBarIcon,
    color: "bg-lime-300",
    title: "Monthly subscription renewed",
    time: "3 days ago",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Recent Activity</h2>
      </div>
      <div className="p-6">
        <ul className="space-y-4" role="list">
          {activities.map(({ icon: Icon, color, title, time }, idx) => (
            <li
              className="flex flex-row items-center focus-within:ring-2 focus-within:ring-lime-500 rounded-lg outline-none"
              key={idx}
              role="listitem"
            >
              <div
                className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mr-3 shadow`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">
                  {title}
                </p>
                <p className="text-xs text-lime-200">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
