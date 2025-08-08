import Link from "next/link";
import { Transaction } from "@/hooks/useSuperAdminTransactions";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

interface SuperAdminTransactionsProps {
  transactions?: Transaction[];
}

function getTxnIcon(tx: { reference?: string; narration?: string }) {
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

export function SuperAdminTransactions({
  transactions,
}: SuperAdminTransactionsProps) {
  const displayTxns =
    transactions && transactions.length > 0 ? transactions.slice(0, 5) : [];

  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60 flex items-center justify-between">
        <h2 className="text-lg font-bold text-red-200">Transactions</h2>
        <Link
          href="/admin/super-dash/transactions"
          className="text-xs text-purple-300 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="p-6">
        <div className="space-y-2">
          {displayTxns.length > 0 ? (
            displayTxns.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {getTxnIcon(txn)}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {txn.narration}
                    </p>
                    <p className="text-xs text-red-300">
                      {txn.status} • {new Date(txn.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    txn.status === "SUCCESSFUL"
                      ? "text-green-300"
                      : txn.status === "FAILED"
                      ? "text-red-400"
                      : "text-yellow-300"
                  }`}
                >
                  ₦{txn.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-red-300">Coming soon</div>
          )}
        </div>
      </div>
    </div>
  );
}
