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
        <div className="space-y-4">
          {activities.map(({ icon: Icon, color, title, time }, idx) => (
            <div className="flex items-center" key={idx}>
              <div
                className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mr-3`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-lime-700">{title}</p>
                <p className="text-xs text-lime-600">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
