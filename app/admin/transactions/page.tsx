"use client";

import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { useRouter } from "next/navigation";
import { useAdminTransactions } from "@/hooks/useAdminTransactions";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

export default function AdminTransactionsPage() {
  const { session, status, isAdmin } = useAdminAuth();
  const router = useRouter();
  const token = session?.accessToken;
  const { transactions, isLoading, error } = useAdminTransactions(token);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const pageSize = 10;

  if (status === "loading" || isLoading) {
    return <AdminLoadingSpinner text="Loading transactions..." />;
  }

  if (status === "unauthenticated" || !session || !isAdmin) {
    router.push("/admin/login");
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading transactions</h2>
          <p className="mb-4">{error.message}</p>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter, search, and paginate transactions
  let filtered = transactions;
  if (search) {
    filtered = filtered.filter(
      (tx) =>
        tx.narration.toLowerCase().includes(search.toLowerCase()) ||
        tx.reference.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (statusFilter) {
    filtered = filtered.filter((tx) => tx.status === statusFilter);
  }
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function getTxIcon(tx: import("@/hooks/useAdminTransactions").Transaction) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      <header className="bg-[#2d1847]/80 backdrop-blur-md shadow-sm border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-200">
            All Transactions
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400 shadow-md hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
          <h2 className="text-lg font-bold text-purple-200 mb-6">
            Transaction List
          </h2>
          <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by narration or reference..."
              className="px-3 py-2 rounded bg-[#1a1333] text-white border border-purple-900 focus-visible:ring-2 focus-visible:ring-purple-400"
            />
            <select
              value={statusFilter || ""}
              onChange={(e) => {
                setStatusFilter(e.target.value || null);
                setPage(1);
              }}
              className="px-3 py-2 rounded bg-[#1a1333] text-white border border-purple-900 focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <option value="">All Status</option>
              <option value="SUCCESSFUL">Successful</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-purple-900 bg-[#2d1847]/60 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Reference
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Narration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-purple-900 hover:bg-purple-900/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm">{getTxIcon(tx)}</td>
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {tx.reference}
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-200">
                      {tx.userId}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-300">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "SUCCESSFUL"
                            ? "bg-green-900/60 text-green-300"
                            : tx.status === "FAILED"
                            ? "bg-red-900/60 text-red-300"
                            : "bg-yellow-900/60 text-yellow-300"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-200">
                      {tx.narration}
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-200">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-purple-300">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-purple-600 text-white text-xs font-semibold shadow hover:bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 rounded bg-purple-600 text-white text-xs font-semibold shadow hover:bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
