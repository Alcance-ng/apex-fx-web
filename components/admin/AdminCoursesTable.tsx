import React from "react";
import {
  AcademicCapIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export type Course = {
  id: string;
  title: string;
  instructor?: string;
  instructorName?: string;
  status?: string;
  createdAt?: string;
};

interface AdminCoursesTableProps {
  courses: Course[];
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  error?: Error;
}

export default function AdminCoursesTable({
  courses,
  page,
  totalPages,
  setPage,
  onEdit,
  onDelete,
  isLoading,
  error,
}: AdminCoursesTableProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-red-200">Loading courses...</div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-400">Error loading courses</div>
    );
  }
  if (courses.length === 0) {
    return (
      <div className="text-center py-8 text-red-300">No courses found.</div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full bg-[#170a0e]/60 rounded-lg overflow-hidden border border-red-900">
        <thead>
          <tr className="bg-[#2a0f1a]/80 text-red-200">
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Instructor</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Created</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr
              key={c.id}
              className={`border-t border-red-900 hover:bg-red-900/10`}
            >
              <td className="py-2 px-4 whitespace-nowrap flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-blue-300" />
                {c.title}
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                {c.instructor || c.instructorName || "-"}
              </td>
              <td className="py-2 px-4 whitespace-nowrap font-bold uppercase">
                {c.status === "active" ? (
                  <span className="text-green-300 flex items-center gap-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-300" />{" "}
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-yellow-300 flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 text-yellow-300" /> INACTIVE
                  </span>
                )}
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
              </td>
              <td className="py-2 px-4 whitespace-nowrap flex gap-2">
                <button
                  onClick={() => onEdit(c.id)}
                  className="p-1 rounded hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Edit ${c.title}`}
                >
                  <PencilIcon className="h-5 w-5 text-blue-300" />
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="p-1 rounded hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={`Delete ${c.title}`}
                >
                  <TrashIcon className="h-5 w-5 text-red-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-[#170a0e]/60 border border-red-900 text-red-200 disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-xs text-red-300">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-[#170a0e]/60 border border-red-900 text-red-200 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
