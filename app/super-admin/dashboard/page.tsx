import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Dashboard - Apex FX",
  description: "Super administrator control panel",
};

export default function SuperAdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Super Admin Header */}
      <header className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-red-100">
                System-wide administration and monitoring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                SUPER ADMIN
              </span>
              <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-red-600 text-xl">🔧</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  System Health
                </p>
                <p className="text-2xl font-semibold text-green-600">99.9%</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">👨‍💼</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Admins
                </p>
                <p className="text-2xl font-semibold text-gray-900">7</p>
                <p className="text-xs text-blue-600">2 active today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold text-gray-900">$2.4M</p>
                <p className="text-xs text-green-600">↗ +23% this quarter</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Issues
                </p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
                <p className="text-xs text-yellow-600">2 critical, 1 warning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Actions */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-red-900 mb-4">
            ⚠️ Critical System Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/super-admin/admins"
              className="flex items-center p-4 bg-white border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors"
            >
              <span className="text-2xl mr-3">👨‍💼</span>
              <div>
                <p className="text-sm font-medium text-red-900">
                  Manage Admins
                </p>
                <p className="text-xs text-red-600">Add/remove admin access</p>
              </div>
            </a>

            <a
              href="/super-admin/settings"
              className="flex items-center p-4 bg-white border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors"
            >
              <span className="text-2xl mr-3">⚙️</span>
              <div>
                <p className="text-sm font-medium text-red-900">
                  System Settings
                </p>
                <p className="text-xs text-red-600">
                  Configure global settings
                </p>
              </div>
            </a>

            <a
              href="/super-admin/logs"
              className="flex items-center p-4 bg-white border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors"
            >
              <span className="text-2xl mr-3">📋</span>
              <div>
                <p className="text-sm font-medium text-red-900">System Logs</p>
                <p className="text-xs text-red-600">View all system activity</p>
              </div>
            </a>

            <button className="flex items-center p-4 bg-white border border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors">
              <span className="text-2xl mr-3">🔄</span>
              <div>
                <p className="text-sm font-medium text-red-900">
                  System Backup
                </p>
                <p className="text-xs text-red-600">
                  Create full system backup
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Admin Activity Log
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Admin John</span> uploaded
                      new course &quot;Advanced Forex Strategies&quot;
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Admin Sarah</span> modified
                      user permissions for 15 accounts
                    </p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Admin Mike</span> attempted
                      to access super admin settings
                    </p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">System</span> detected
                      suspicious login attempts from unknown IP
                    </p>
                    <p className="text-xs text-gray-500">8 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/super-admin/logs"
                  className="text-red-600 text-sm hover:text-red-700"
                >
                  View full activity log →
                </a>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Financial Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Recurring Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$89,420</p>
                  </div>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    +12%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      One-time Purchases
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$24,680</p>
                  </div>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    +8%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Refunds Processed
                    </p>
                    <p className="text-2xl font-bold text-red-600">$1,240</p>
                  </div>
                  <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                    +3%
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Net Revenue
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        $112,860
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">This month</p>
                      <p className="text-sm text-green-600">
                        +15% vs last month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              🚨 System Alerts
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-500 text-lg mr-3">🔴</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">
                    High memory usage detected on Server 2
                  </p>
                  <p className="text-xs text-red-700">
                    Memory usage: 89% - Consider scaling up
                  </p>
                </div>
                <button className="text-red-600 text-sm hover:text-red-700">
                  Investigate
                </button>
              </div>

              <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="text-yellow-500 text-lg mr-3">🟡</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-900">
                    SSL certificate expires in 30 days
                  </p>
                  <p className="text-xs text-yellow-700">
                    Domain: api.apex-fx.com
                  </p>
                </div>
                <button className="text-yellow-600 text-sm hover:text-yellow-700">
                  Renew
                </button>
              </div>

              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-500 text-lg mr-3">ℹ️</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    System backup completed successfully
                  </p>
                  <p className="text-xs text-blue-700">
                    Last backup: 2 hours ago
                  </p>
                </div>
                <button className="text-blue-600 text-sm hover:text-blue-700">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
