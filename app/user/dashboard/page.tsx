import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Apex FX",
  description: "Your trading dashboard",
};

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back!</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Signals
                </p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  This Month P&L
                </p>
                <p className="text-2xl font-semibold text-green-600">+$2,450</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">🎓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Courses Completed
                </p>
                <p className="text-2xl font-semibold text-gray-900">3/8</p>
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
                href="/subscriptions"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mr-3">📊</span>
                <span className="text-sm font-medium">
                  Manage Subscriptions
                </span>
              </a>
              <a
                href="/courses"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mr-3">🎓</span>
                <span className="text-sm font-medium">Browse Courses</span>
              </a>
              <a
                href="/transactions"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mr-3">💳</span>
                <span className="text-sm font-medium">View Transactions</span>
              </a>
              <a
                href="/profile"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mr-3">👤</span>
                <span className="text-sm font-medium">Edit Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    New signal: EUR/USD Buy
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Course completed: Advanced Technical Analysis
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Monthly subscription renewed
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
