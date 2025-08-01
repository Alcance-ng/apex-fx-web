import {
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

const stats = [
  {
    icon: ChartBarIcon,
    iconBg: "bg-lime-100/60",
    cardBg: "bg-gradient-to-br from-lime-100 via-lime-300 to-emerald-100",
    iconColor: "text-emerald-600",
    title: "Active Signals",
    value: "12",
    valueColor: "text-emerald-900",
    titleColor: "text-lime-700",
    border: "border-lime-300",
  },
  {
    icon: CurrencyDollarIcon,
    iconBg: "bg-yellow-100/60",
    cardBg: "bg-gradient-to-br from-yellow-100 via-lime-200 to-lime-300",
    iconColor: "text-lime-600",
    title: "This Month P&L",
    value: "+$2,450",
    valueColor: "text-lime-900",
    titleColor: "text-yellow-700",
    border: "border-yellow-300",
  },
  {
    icon: AcademicCapIcon,
    iconBg: "bg-green-100/60",
    cardBg: "bg-gradient-to-br from-green-100 via-lime-200 to-emerald-200",
    iconColor: "text-lime-600",
    title: "Courses Completed",
    value: "3/8",
    valueColor: "text-green-900",
    titleColor: "text-emerald-700",
    border: "border-emerald-300",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {stats.map(
        (
          {
            icon: Icon,
            iconBg,
            cardBg,
            iconColor,
            title,
            value,
            valueColor,
            titleColor,
            border,
          },
          idx
        ) => (
          <div
            key={title}
            className={`min-w-0 rounded-lg shadow p-3 sm:p-6 border ${border} ${cardBg} backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-black/20 cursor-pointer flex flex-col justify-center ${
              idx === 2 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div className="flex items-center min-w-0">
              <div
                className={`p-1 sm:p-2 rounded-lg ${iconBg} transition-colors duration-300 flex-shrink-0`}
              >
                <Icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor} transition-colors duration-300`}
                />
              </div>
              <div className="ml-2 sm:ml-4 min-w-0">
                <p
                  className={`text-xs sm:text-sm font-medium ${titleColor} transition-colors duration-300 truncate`}
                  title={title}
                >
                  {title}
                </p>
                <p
                  className={`text-lg sm:text-2xl font-semibold ${valueColor} transition-colors duration-300 break-words`}
                >
                  {value}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
