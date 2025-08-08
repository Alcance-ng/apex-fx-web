"use client";

import { useState } from "react";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { Course } from "@/components/admin/AdminCoursesTable";
import { PlusIcon } from "@heroicons/react/24/solid";

const PAGE_SIZE = 10;

export default function AdminCoursesPage() {
  const { session } = useAdminAuth();
  const token = session?.accessToken;
  const { courses } = useAdminCourses(token);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    status: "active",
  });

  // Filter by search and status
  const filteredCourses = courses.filter((c: Course) => {
    const status = c.status?.toLowerCase();
    const filter = statusFilter.toLowerCase();
    return (
      (filter === "all" || status === filter) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor?.toLowerCase().includes(search.toLowerCase()) ||
        c.instructorName?.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Actions
  const handleEdit = (courseId: string) => {
    // TODO: Implement edit logic/modal
    alert(`Edit course ${courseId}`);
  };
  const handleDelete = (courseId: string) => {
    // TODO: Implement delete logic/modal
    if (confirm("Are you sure you want to delete this course?")) {
      alert(`Delete course ${courseId}`);
    }
  };
  const handleCreateCourse = () => {
    // TODO: Implement backend call to create course
    alert(`Course created: ${newCourse.title}`);
    setShowModal(false);
    setNewCourse({ title: "", instructor: "", status: "active" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      <header className="bg-[#2d1847]/80 backdrop-blur-md shadow-sm border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-200">All Courses</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
          <h2 className="text-lg font-bold text-purple-200 mb-6">
            Course List
          </h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400 shadow-md hover:bg-purple-700 transition-colors"
            >
              Add Course
            </button>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by title or instructor..."
              className="px-3 py-2 rounded bg-[#1a1333] text-white border border-purple-900 focus-visible:ring-2 focus-visible:ring-purple-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded bg-[#1a1333] text-white border border-purple-900 focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-purple-900 bg-[#2d1847]/60 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Instructor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCourses.map((c: Course) => (
                  <tr
                    key={c.id}
                    className="border-b border-purple-900 hover:bg-purple-900/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {c.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-200">
                      {c.instructor || c.instructorName || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          c.status === "active"
                            ? "bg-green-900/60 text-green-300"
                            : "bg-yellow-900/60 text-yellow-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-purple-200">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(c.id)}
                        className="p-1 rounded hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Edit ${c.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1 rounded hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label={`Delete ${c.title}`}
                      >
                        Delete
                      </button>
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
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#2d1847]/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-purple-900 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-200 flex items-center gap-2">
                <PlusIcon className="h-6 w-6 text-blue-300" /> Create New Course
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full bg-purple-900/40 text-purple-200 hover:bg-purple-900/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-purple-300 mb-6">
              Fill in the details below to add a new course to the system.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateCourse();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, title: e.target.value }))
                }
                placeholder="Course Title"
                required
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, instructor: e.target.value }))
                }
                placeholder="Instructor Name"
                required
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <select
                value={newCourse.status}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, status: e.target.value }))
                }
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-red-900/60 text-red-200 hover:bg-red-900/80 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
