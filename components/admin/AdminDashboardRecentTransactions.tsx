import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Transaction } from "@/hooks/useAdminTransactions";

interface AdminDashboardRecentTransactionsProps {
  transactions: Transaction[];
}

function getTxIcon(tx: Transaction) {
  if (
    tx.reference?.startsWith("COURSE") ||
    tx.narration?.toLowerCase().includes("course")
  ) {
    return (
      <AcademicCapIcon
        className="h-5 w-5 text-orange-300 mr-2"
        aria-label="Course"
      />
    );
  }
  if (
    tx.reference?.startsWith("SIGNAL") ||
    tx.narration?.toLowerCase().includes("signal")
  ) {
    return (
      <ArrowTrendingUpIcon
        className="h-5 w-5 text-blue-300 mr-2"
        aria-label="Signal/Forex"
      />
    );
  }
  return (
    <ExclamationCircleIcon
      className="h-5 w-5 text-yellow-300 mr-2"
      aria-label="Other"
    />
  );
}

export function AdminDashboardRecentTransactions({
  transactions,
}: AdminDashboardRecentTransactionsProps) {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg border border-purple-900">
      <div className="px-6 py-4 border-b border-purple-900">
        <h2 className="text-lg font-medium text-purple-200">
          Recent Transactions
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {getTxIcon(tx)}
                <div>
                  <p className="text-sm font-medium text-white">
                    {tx.narration}
                  </p>
                  <p className="text-xs text-purple-300">
                    {tx.status} • {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  tx.status === "SUCCESSFUL"
                    ? "text-green-300"
                    : tx.status === "FAILED"
                    ? "text-red-400"
                    : "text-yellow-300"
                }`}
              >
                ₦{tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/admin/transactions"
            className="text-blue-300 text-sm hover:text-blue-400 focus-visible:underline outline-none"
            aria-label="View all transactions"
          >
            View all transactions →
          </a>
        </div>
      </div>
    </div>
  );
}
