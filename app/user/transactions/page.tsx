"use client";

import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserTransactions } from "@/hooks/useUserTransactions";
import Select from "@/components/ui/Select";

export default function UserTransactionsPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [q, setQ] = useState("");

  const { transactions: allTransactions, /* total: totalCount */ isLoading, error } = useUserTransactions(token); // removed unused totalCount (lint warning)

  const filtered = useMemo(() => {
    const t = (allTransactions || []).filter((tx) => (statusFilter ? tx.status === statusFilter : true));
    if (!q) return t;
    const lower = q.toLowerCase();
    return t.filter((tx) => (tx.reference || "").toLowerCase().includes(lower) || (tx.narration || "").toLowerCase().includes(lower));
  }, [allTransactions, statusFilter, q]);

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-6">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg text-white font-medium">Transactions</h2>
            <p className="text-xs text-lime-200">All transactions for your account</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search reference or narration"
              className="px-2 py-1 rounded bg-white/10 placeholder:text-lime-200 text-white w-56 border border-white/10 text-sm"
            />

            <Select
              value={statusFilter || ""}
              onChange={(v) => {
                setStatusFilter(v ? String(v) : undefined);
                setPage(1);
              }}
              options={[
                { value: "", label: "All statuses" },
                { value: "SUCCESSFUL", label: "Successful" },
                { value: "FAILED", label: "Failed" },
                { value: "PENDING", label: "Pending" },
              ]}
              buttonClass="px-2 py-1 bg-white/10 text-lime-200"
              menuClass="bg-emerald-900/90"
            />

            <Select
              value={perPage}
              onChange={(v) => {
                setPerPage(Number(v));
                setPage(1);
              }}
              options={[{ value: 5, label: "5 / page" }, { value: 10, label: "10 / page" }, { value: 25, label: "25 / page" }]}
              buttonClass="px-2 py-1 bg-white/10 text-lime-200"
              menuClass="bg-emerald-900/90"
            />

            <a
              href="/user/dashboard"
              className="ml-2 inline-flex items-center gap-2 px-3 py-1 bg-white/6 hover:bg-white/8 text-white rounded text-sm"
            >
              Back to dashboard
            </a>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-white">Loading transactions...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-400">Failed to load transactions</div>
        ) : (
          <div className="bg-white/3 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-white">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Narration</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-lime-200">
                        No transactions to show.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((tx) => (
                      <tr key={tx.id} className="border-t border-white/6 hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3 align-top">
                          <div className="text-sm font-medium">{tx.reference}</div>
                          <div className="text-xs text-lime-200">{tx.userId}</div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="text-sm">{tx.narration}</div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="text-sm font-medium">{"₦" + (tx.amount || 0).toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className={`px-2 py-1 rounded text-xs ${tx.status === "SUCCESSFUL" ? "bg-lime-600 text-white" : tx.status === "FAILED" ? "bg-red-600 text-white" : "bg-yellow-500 text-black"}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top text-sm text-lime-200">{new Date(tx.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5">
              <div className="text-sm text-lime-200">Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total}</div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-white/6 rounded disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <div className="px-3 py-1 text-white">Page {page}</div>
                <button
                  className="px-3 py-1 bg-white/6 rounded disabled:opacity-50"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * perPage >= total}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
