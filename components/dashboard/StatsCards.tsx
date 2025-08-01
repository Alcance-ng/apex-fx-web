import {
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border border-lime-100">
        <div className="flex items-center">
          <div className="p-2 bg-lime-100 rounded-lg">
            <ChartBarIcon className="h-6 w-6 text-lime-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-lime-600">Active Signals</p>
            <p className="text-2xl font-semibold text-lime-700">12</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border border-lime-100">
        <div className="flex items-center">
          <div className="p-2 bg-lime-200 rounded-lg">
            <CurrencyDollarIcon className="h-6 w-6 text-lime-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-lime-600">This Month P&L</p>
            <p className="text-2xl font-semibold text-lime-600">+$2,450</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border border-lime-100">
        <div className="flex items-center">
          <div className="p-2 bg-lime-300 rounded-lg">
            <AcademicCapIcon className="h-6 w-6 text-lime-800" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-lime-600">
              Courses Completed
            </p>
            <p className="text-2xl font-semibold text-lime-700">3/8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
