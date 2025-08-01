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
  },
  {
    href: "/courses",
    icon: AcademicCapIcon,
    label: "Browse Courses",
  },
  {
    href: "/transactions",
    icon: CreditCardIcon,
    label: "View Transactions",
  },
  {
    href: "/profile",
    icon: UserIcon,
    label: "Edit Profile",
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow mb-8 border border-lime-100">
      <div className="px-6 py-4 border-b border-lime-200">
        <h2 className="text-lg font-medium text-lime-700">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center p-4 border border-lime-200 rounded-lg hover:bg-lime-50 transition-colors"
            >
              <Icon className="h-6 w-6 text-lime-700 mr-3" />
              <span className="text-sm font-medium text-lime-700">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
