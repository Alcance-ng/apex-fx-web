import {
  ChartBarIcon,
  AcademicCapIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const actions = [
  {
    href: "/courses",
    icon: AcademicCapIcon,
    label: "Browse Courses",
    iconColor: "text-lime-300",
    border: "border-white/10",
  },
  {
    href: "/subscriptions",
    icon: ChartBarIcon,
    label: "Manage Subscriptions",
    iconColor: "text-lime-300",
    border: "border-white/10",
  },

  {
    href: "/transactions",
    icon: CreditCardIcon,
    label: "View Transactions",
    iconColor: "text-lime-300",
    border: "border-white/10",
  },
  {
    href: "/profile",
    icon: UserIcon,
    label: "View Profile",
    iconColor: "text-lime-300",
    border: "border-white/10",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl shadow-lg mb-8 border border-white/10 bg-white/10 backdrop-blur-md">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Quick Actions</h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map(({ href, icon: Icon, label, iconColor, border }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-row items-center justify-start p-3 border ${border} rounded-xl bg-white/10 backdrop-blur-md transition-all duration-300 ease-out hover:shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900/50 shadow ${iconColor} mr-3`}
                aria-hidden="true"
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </span>
              <span className="text-sm font-semibold text-white text-left">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
