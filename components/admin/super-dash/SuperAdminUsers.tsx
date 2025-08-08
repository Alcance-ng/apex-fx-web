import { useSuperAdminUsers } from "@/hooks/useSuperAdminUsers";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

interface SuperAdminUsersProps {
  token?: string;
}

export function SuperAdminUsers({ token }: SuperAdminUsersProps) {
  const { users, isLoading, error } = useSuperAdminUsers(token);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  if (isLoading) {
    return <div className="p-6 text-red-200">Loading users...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-red-300">
        Error loading users: {error.message}
      </div>
    );
  }

  let filtered = users;
  if (search) {
    filtered = filtered.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60 flex items-center justify-between">
        <h2 className="text-lg font-bold text-red-200">Users</h2>
        <Link
          href="/admin/super-dash/users"
          className="text-xs text-purple-300 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="p-6">
        <div className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email..."
            className="px-3 py-2 rounded bg-[#170a0f] text-white border border-red-900 focus-visible:ring-2 focus-visible:ring-purple-400"
          />
        </div>
        <div className="space-y-2">
          {paginated.length > 0 ? (
            paginated.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 py-2 border-b border-red-900/30"
              >
                <UserIcon className="h-5 w-5 text-blue-300" />
                <span className="text-sm font-medium text-white">
                  {user.name || user.email}
                </span>
                <span className="text-xs text-red-300">{user.email}</span>
              </div>
            ))
          ) : (
            <div className="text-red-300">No users found</div>
          )}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-red-300">
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
        )}
      </div>
    </div>
  );
}
