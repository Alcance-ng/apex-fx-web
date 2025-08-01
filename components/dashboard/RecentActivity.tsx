import { ChartBarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

const activities = [
  {
    icon: ChartBarIcon,
    color: "bg-lime-400",
    title: "New signal: EUR/USD Buy",
    time: "2 hours ago",
  },
  {
    icon: AcademicCapIcon,
    color: "bg-lime-300",
    title: "Course completed: Advanced Technical Analysis",
    time: "1 day ago",
  },
  {
    icon: ChartBarIcon,
    color: "bg-lime-200",
    title: "Monthly subscription renewed",
    time: "3 days ago",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow border border-lime-100">
      <div className="px-6 py-4 border-b border-lime-200">
        <h2 className="text-lg font-medium text-lime-700">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4" role="list">
          {activities.map(({ icon: Icon, color, title, time }, idx) => (
            <div
              className="flex flex-row items-center focus-within:ring-2 focus-within:ring-lime-500 rounded-lg outline-none"
              key={idx}
              role="listitem"
              tabIndex={0}
              aria-label={`${title}, ${time}`}
            >
              <div
                className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mr-3 shadow focus:outline-none`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-lime-900 leading-tight">
                  {title}
                </p>
                <p
                  className="text-xs text-lime-800"
                  aria-label={`Time: ${time}`}
                >
                  {time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
