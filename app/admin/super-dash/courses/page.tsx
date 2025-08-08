"use client";

import { useState } from "react";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import AdminCoursesHeader from "@/components/admin/AdminCoursesHeader";
import AdminCoursesTable, {
  Course,
} from "@/components/admin/AdminCoursesTable";
import { PlusIcon } from "@heroicons/react/24/solid";

const PAGE_SIZE = 10;

export default function SuperAdminCoursesPage() {
  const { session } = useAdminAuth();
  const token = session?.accessToken;
  const { courses, isLoading, error } = useAdminCourses(token);
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
    <div className="min-h-screen bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto relative">
        <AdminCoursesHeader
          search={search}
          setSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          statusFilter={statusFilter}
          setStatusFilter={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
          total={filteredCourses.length}
        />
        <AdminCoursesTable
          courses={paginatedCourses}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
          error={error}
        />
        {/* FAB aligned with content */}
        <button
          className="fixed bottom-12 right-12 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-red-900 text-white rounded-full shadow-lg p-4 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-purple-400"
          onClick={() => setShowModal(true)}
          aria-label="Create Course"
        >
          <PlusIcon className="h-7 w-7" />
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#170a0e] rounded-xl p-8 w-full max-w-md border border-red-900 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-red-200 flex items-center gap-2">
              <PlusIcon className="h-6 w-6 text-blue-300" /> Create New Course
            </h2>
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
                className="px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="text"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, instructor: e.target.value }))
                }
                placeholder="Instructor Name"
                required
                className="px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <select
                value={newCourse.status}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, status: e.target.value }))
                }
                className="px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border border-red-900 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-red-900/60 text-red-200 hover:bg-red-900/80 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-900/60 text-blue-200 hover:bg-blue-900/80 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold"
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
