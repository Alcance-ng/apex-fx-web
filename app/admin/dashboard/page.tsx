import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Apex FX",
  description: "Admin control panel",
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage users, courses, and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Admin
              </span>
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">1,247</p>
                <p className="text-xs text-green-600">↗ +12% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Subscriptions
                </p>
                <p className="text-2xl font-semibold text-gray-900">892</p>
                <p className="text-xs text-green-600">↗ +8% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-semibold text-gray-900">$84,230</p>
                <p className="text-xs text-green-600">↗ +15% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-xl">🎓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
                <p className="text-xs text-blue-600">2 new this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="/admin/courses"
                className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl mr-3">📚</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Upload Course
                  </p>
                  <p className="text-xs text-gray-500">
                    Add new educational content
                  </p>
                </div>
              </a>

              <a
                href="/admin/users"
                className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Manage Users
                  </p>
                  <p className="text-xs text-gray-500">
                    View and edit user accounts
                  </p>
                </div>
              </a>

              <a
                href="/admin/analytics"
                className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <span className="text-2xl mr-3">📈</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    View Analytics
                  </p>
                  <p className="text-xs text-gray-500">
                    Check performance metrics
                  </p>
                </div>
              </a>

              <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
                <span className="text-2xl mr-3">📤</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Send Signal
                  </p>
                  <p className="text-xs text-gray-500">
                    Broadcast trading signal
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Users
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">JD</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">SM</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Sarah Miller
                      </p>
                      <p className="text-xs text-gray-500">sarah@example.com</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">MJ</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Mike Johnson
                      </p>
                      <p className="text-xs text-gray-500">mike@example.com</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/admin/users"
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  View all users →
                </a>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Transactions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Monthly Subscription
                    </p>
                    <p className="text-xs text-gray-500">
                      John Doe • 2 hours ago
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +$99.00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Course Purchase
                    </p>
                    <p className="text-xs text-gray-500">
                      Sarah Miller • 5 hours ago
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +$49.00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Yearly Subscription
                    </p>
                    <p className="text-xs text-gray-500">
                      Mike Johnson • 1 day ago
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +$999.00
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/admin/transactions"
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  View all transactions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
