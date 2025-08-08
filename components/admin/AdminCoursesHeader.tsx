import { BookOpenIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";

interface AdminCoursesHeaderProps {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  total: number;
}

export default function AdminCoursesHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  total,
}: AdminCoursesHeaderProps) {
  const router = useRouter();
  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#170a0e]/60 border border-red-900 text-red-200 hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Go Back
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-red-200">
            <BookOpenIcon className="h-7 w-7 text-blue-300" />
            Manage Courses
          </h1>
        </div>
        <p className="text-sm text-red-300 mt-1 sm:mt-0 sm:ml-4">
          View and manage all courses. You can search, filter, edit, or delete
          courses.
        </p>
      </div>
      <div className="flex items-center justify-between mb-6 gap-2 flex-wrap w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses by title or instructor..."
          className="w-full sm:w-64 px-3 py-2 rounded-lg bg-[#170a0e]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Search courses"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 rounded-lg bg-[#170a0e]/60 border border-red-900 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <span className="text-xs text-red-300 ml-2">Total: {total}</span>
      </div>
    </>
  );
}
