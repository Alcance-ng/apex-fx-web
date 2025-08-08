"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { useSuperAdminAdmins } from "@/hooks/useSuperAdminAdmins";
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const PAGE_SIZE = 10;

export default function SuperAdminAdminsPage() {
  const { session } = useAdminAuth();
  const token = session?.accessToken;
  const { admins, isLoading, error } = useSuperAdminAdmins(token);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Filter by search and role
  const filteredAdmins = admins.filter(
    (a: { name: string; email: string; role: string }) => {
      const role = a.role?.toUpperCase().replace(/\s+/g, "");
      const filter = roleFilter.toUpperCase().replace(/\s+/g, "");
      return (
        (filter === "ALL" || role === filter) &&
        (a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase()))
      );
    }
  );

  // Pagination
  const totalPages = Math.ceil(filteredAdmins.length / PAGE_SIZE);
  const paginatedAdmins = filteredAdmins.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Actions
  const handleEdit = (adminId: string) => {
    // TODO: Implement edit logic/modal
    alert(`Edit admin ${adminId}`);
  };
  const handleDelete = (adminId: string) => {
    // TODO: Implement delete logic/modal
    if (confirm("Are you sure you want to delete this admin?")) {
      alert(`Delete admin ${adminId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-red-200">
            <UserGroupIcon className="h-7 w-7 text-blue-300" />
            Manage Admins
          </h1>
          <p className="text-sm text-red-300 mt-1">
            View and manage all system admins. You can search, filter, edit, or
            delete admins.
          </p>
        </div>
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search admins by name or email..."
            className="w-full sm:w-64 px-3 py-2 rounded-lg bg-[#170a0e]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Search admins"
          />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-40 px-3 py-2 rounded-lg bg-[#170a0e]/60 border border-red-900 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <span className="text-xs text-red-300 ml-2">
            Total: {filteredAdmins.length}
          </span>
        </div>
        {isLoading ? (
          <div className="text-center py-8 text-red-200">Loading admins...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            Error loading admins
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="text-center py-8 text-red-300">No admins found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full bg-[#170a0e]/60 rounded-lg overflow-hidden border border-red-900">
              <thead>
                <tr className="bg-[#2a0f1a]/80 text-red-200">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Created</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map((a) => (
                  <tr
                    key={a.id}
                    className={`border-t border-red-900 hover:bg-red-900/10 ${
                      a.role?.toUpperCase() === "SUPER_ADMIN"
                        ? "bg-gradient-to-r from-purple-900/40 to-transparent"
                        : ""
                    }`}
                  >
                    <td className="py-2 px-4 whitespace-nowrap flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-red-300" />
                      {a.name}
                      {a.role?.toUpperCase() === "SUPER_ADMIN" && (
                        <span className="text-xs px-2 py-1 rounded bg-purple-900/60 text-purple-300 ml-2 flex items-center gap-1 font-bold uppercase">
                          <ShieldCheckIcon className="h-4 w-4 text-purple-300" />{" "}
                          SUPER ADMIN
                        </span>
                      )}
                      {a.role?.toUpperCase() === "ADMIN" && (
                        <span className="text-xs px-2 py-1 rounded bg-blue-900/60 text-blue-300 ml-2 flex items-center gap-1 font-bold uppercase">
                          <StarIcon className="h-4 w-4 text-blue-300" /> ADMIN
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">{a.email}</td>
                    <td className="py-2 px-4 whitespace-nowrap font-bold uppercase">
                      {a.role?.toUpperCase() === "SUPER_ADMIN" ? (
                        <span className="text-purple-300 flex items-center gap-1">
                          <ShieldCheckIcon className="h-4 w-4 text-purple-300" />{" "}
                          SUPER ADMIN
                        </span>
                      ) : a.role?.toUpperCase() === "ADMIN" ? (
                        <span className="text-blue-300 flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-blue-300" /> ADMIN
                        </span>
                      ) : (
                        a.role
                      )}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap flex gap-2">
                      {a.role?.toUpperCase() !== "SUPER_ADMIN" && (
                        <>
                          <button
                            onClick={() => handleEdit(a.id)}
                            className="p-1 rounded hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label={`Edit ${a.name}`}
                          >
                            <PencilIcon className="h-5 w-5 text-blue-300" />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="p-1 rounded hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-400"
                            aria-label={`Delete ${a.name}`}
                          >
                            <TrashIcon className="h-5 w-5 text-red-300" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-[#170a0e]/60 border border-red-900 text-red-200 disabled:opacity-40"
              >
                Prev
              </button>
              <span className="text-xs text-red-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-[#170a0e]/60 border border-red-900 text-red-200 disabled:opacity-40"
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
