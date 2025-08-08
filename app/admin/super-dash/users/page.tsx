"use client";

import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { useRouter } from "next/navigation";
import { useSuperAdminUsers } from "@/hooks/useSuperAdminUsers";
import React from "react";

export default function SuperAdminUsersPage() {
  const { session, status, isSuperAdmin } = useAdminAuth();
  const router = useRouter();
  const token = session?.accessToken;
  const { users, isLoading, error } = useSuperAdminUsers(token);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading users...
      </div>
    );
  }

  if (status === "unauthenticated" || !session || !isSuperAdmin) {
    router.push("/admin/login");
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading users</h2>
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

  // Only use users, no pagination/search for now
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170a0f] via-[#2a0f1a] to-[#3b0f24] text-white">
      <header className="bg-[#2a0f1a]/80 backdrop-blur-md shadow-sm border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-200">All Users</h1>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400 shadow-md hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#2a0f1a]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-red-900">
          <h2 className="text-lg font-bold text-red-200 mb-6">User List</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-red-900 bg-[#2a0f1a]/60 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Email Verified
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-red-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-red-900 hover:bg-red-900/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {user.name || user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-200">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-300">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.isEmailVerified ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/60 text-green-300">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/60 text-yellow-300">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-200">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label={`View ${user.name || user.email}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
