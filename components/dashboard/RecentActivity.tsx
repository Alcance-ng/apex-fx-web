
import { BanknotesIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useUserTransactions } from "@/hooks/useUserTransactions";
import React from "react";

export function RecentTransaction() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { transactions, isLoading, error } = useUserTransactions(token);

  // Helper to pick icon and color based on transaction type
  const getIconAndColor = (narration: string) => {
    if (narration?.toLowerCase().includes("deposit")) {
      return { Icon: BanknotesIcon, color: "bg-lime-500" };
    }
    if (narration?.toLowerCase().includes("profit")) {
      return { Icon: ArrowTrendingUpIcon, color: "bg-lime-400" };
    }
    if (narration?.toLowerCase().includes("withdrawal")) {
      return { Icon: BanknotesIcon, color: "bg-lime-300" };
    }
    return { Icon: BanknotesIcon, color: "bg-lime-200" };
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Recent Transactions</h2>
      </div>
  <div className="p-6">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : error ? (
          <div className="text-red-400">Failed to load transactions</div>
        ) : (
          <ul className="space-y-4" role="list">
            {transactions.length === 0 ? (
              <li className="text-white">No transactions found.</li>
            ) : (
              transactions.slice(0, 4).map((tx, idx) => {
                const { Icon, color } = getIconAndColor(tx.narration);
                return (
                  <li
                    className="flex flex-row items-center focus-within:ring-2 focus-within:ring-lime-500 rounded-lg outline-none"
                    key={tx.id || idx}
                    role="listitem"
                  >
                    <div
                      className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mr-3 shadow`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight">
                          {tx.narration} - {"₦" + (tx.amount || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-lime-200">
                        {new Date(tx.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
          <div className="mt-4 text-right">
            <a href="/user/transactions" className="text-sm text-lime-200 hover:underline">
              View all
            </a>
          </div>
      </div>
    </div>
  );
}
