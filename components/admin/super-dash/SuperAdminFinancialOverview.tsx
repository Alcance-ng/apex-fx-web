import React from "react";

export function SuperAdminFinancialOverview() {
  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200">Financial Overview</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-300">
                Monthly Recurring Revenue
              </p>
              <p className="text-2xl font-bold text-white">$89,420</p>
            </div>
            <span className="text-sm text-green-300 bg-green-900/40 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-300">
                One-time Purchases
              </p>
              <p className="text-2xl font-bold text-white">$24,680</p>
            </div>
            <span className="text-sm text-green-300 bg-green-900/40 px-2 py-1 rounded">
              +8%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-300">
                Refunds Processed
              </p>
              <p className="text-2xl font-bold text-red-300">$1,240</p>
            </div>
            <span className="text-sm text-red-300 bg-red-900/40 px-2 py-1 rounded">
              +3%
            </span>
          </div>
          <div className="border-t border-red-900/60 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-300">Net Revenue</p>
                <p className="text-3xl font-bold text-green-300">$112,860</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-300">This month</p>
                <p className="text-sm text-green-300">+15% vs last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
