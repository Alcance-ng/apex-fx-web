import React from "react";

interface FinancialRow {
  label: string;
  value: string;
  change: string;
  changeColor: string;
  valueColor: string;
}

function FinancialOverviewRow({
  label,
  value,
  change,
  changeColor,
  valueColor,
}: FinancialRow) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-red-300">{label}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </div>
      <span className={`text-sm ${changeColor} px-2 py-1 rounded`}>
        {change}
      </span>
    </div>
  );
}

export function SuperAdminFinancialOverview({
  totalRevenue,
}: {
  totalRevenue?: number;
}) {
  const rows: FinancialRow[] = [
    {
      label: "Monthly Recurring Revenue",
      value: "$89,420",
      change: "+12%",
      changeColor: "text-green-300 bg-green-900/40",
      valueColor: "text-white",
    },
    {
      label: "One-time Purchases",
      value: "$24,680",
      change: "+8%",
      changeColor: "text-green-300 bg-green-900/40",
      valueColor: "text-white",
    },
    {
      label: "Refunds Processed",
      value: "$1,240",
      change: "+3%",
      changeColor: "text-red-300 bg-red-900/40",
      valueColor: "text-red-300",
    },
  ];

  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200">Financial Overview</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {rows.map((row) => (
            <FinancialOverviewRow key={row.label} {...row} />
          ))}
          <div className="border-t border-red-900/60 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-300">Net Revenue</p>
                <p className="text-3xl font-bold text-green-300">
                  {typeof totalRevenue === "number"
                    ? `₦${totalRevenue.toLocaleString()}`
                    : "Coming soon"}
                </p>
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
