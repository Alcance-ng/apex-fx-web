import {
  ChartBarIcon,
  AcademicCapIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const actions = [
  {
    href: "/subscriptions",
    icon: ChartBarIcon,
    label: "Manage Subscriptions",
    iconColor: "text-emerald-700",
    border: "border-lime-300",
  },
  {
    href: "/courses",
    icon: AcademicCapIcon,
    label: "Browse Courses",
    iconColor: "text-lime-700",
    border: "border-lime-300",
  },
  {
    href: "/transactions",
    icon: CreditCardIcon,
    label: "View Transactions",
    iconColor: "text-green-700",
    border: "border-emerald-300",
  },
  {
    href: "/profile",
    icon: UserIcon,
    label: "Edit Profile",
    iconColor: "text-emerald-700",
    border: "border-lime-300",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl shadow-lg mb-8 border border-lime-100 bg-white/90 backdrop-blur-md">
      <div className="px-6 py-4 border-b border-lime-200">
        <h2 className="text-lg font-medium text-lime-900">Quick Actions</h2>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {actions.map(({ href, icon: Icon, label, iconColor, border }) => (
            <a
              key={href}
              href={href}
              className={`group flex flex-row items-center justify-start p-2 sm:p-3 border ${border} rounded-xl bg-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:border-lime-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-400`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-lime-50 shadow ${iconColor} mr-2 sm:mr-3 transition-colors duration-300 group-hover:bg-lime-100`}
              >
                <Icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor} transition-colors duration-300`}
                />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-left transition-colors duration-300 group-hover:text-lime-900">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
