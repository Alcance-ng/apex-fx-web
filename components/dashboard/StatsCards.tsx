import {
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface StatsCardsProps {
  activeSignals?: number;
  pnl?: string;
  coursesCompleted?: string;
}

export function StatsCards({
  activeSignals = 12,
  pnl = "+$2,450",
  coursesCompleted = "3/8",
}: StatsCardsProps) {
  const stats = [
    {
      icon: ChartBarIcon,
      iconBg: "bg-emerald-800/50",
      cardBg: "bg-white/10",
      iconColor: "text-lime-300",
      title: "Active Signals",
      value: activeSignals.toString(),
      valueColor: "text-white",
      titleColor: "text-lime-200",
      border: "border-white/10",
      link: "/user/signals",
    },
    {
      icon: CurrencyDollarIcon,
      iconBg: "bg-emerald-800/50",
      cardBg: "bg-white/10",
      iconColor: "text-lime-300",
      title: "This Month P&L",
      value: pnl,
      valueColor: "text-white",
      titleColor: "text-lime-200",
      border: "border-white/10",
    },
    {
      icon: AcademicCapIcon,
      iconBg: "bg-emerald-800/50",
      cardBg: "bg-white/10",
      iconColor: "text-lime-300",
      title: "Courses Completed",
      value: coursesCompleted,
      valueColor: "text-white",
      titleColor: "text-lime-200",
      border: "border-white/10",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {stats.map(
        ({
          icon: Icon,
          iconBg,
          cardBg,
          iconColor,
          title,
          value,
          valueColor,
          titleColor,
          border,
          link,
        }) => {
          const cardContent = (
            <div
              key={title}
              className={`min-w-0 rounded-xl shadow p-3 sm:p-6 border ${border} ${cardBg} backdrop-blur-md transition-all duration-300 ease-out hover:shadow-2xl cursor-pointer focus-within:ring-2 focus-within:ring-lime-400`}
            >
              <div className="flex items-center min-w-0">
                <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p
                    className={`text-sm font-medium ${titleColor} truncate`}
                    title={title}
                  >
                    {title}
                  </p>
                  <p className={`text-2xl font-semibold ${valueColor}`}>
                    {value}
                  </p>
                </div>
              </div>
            </div>
          );

          return link ? (
            <Link key={title} href={link}>
              {cardContent}
            </Link>
          ) : (
            cardContent
          );
        }
      )}
    </div>
  );
}
