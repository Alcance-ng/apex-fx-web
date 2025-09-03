"use client";

import { useState, useRef } from "react";
import { useAdminCourses, Course } from "@/hooks/useAdminCourses";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const PAGE_SIZE = 10;

export default function AdminCoursesPage() {
  const { session } = useAdminAuth();
  const token = session?.accessToken;
  const { courses } = useAdminCourses(token);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    price: "",
    discount: "0",
    accessLink: "",
    accessCode: "",
    imageUrl: "",
    duration: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filter by search
  const filteredCourses = courses.filter((c: Course) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.duration.toLowerCase().includes(search.toLowerCase())
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
  const resetForm = () => {
    setNewCourse({
      name: "",
      description: "",
      price: "",
      discount: "0",
      accessLink: "",
      accessCode: "",
      imageUrl: "",
      duration: "",
    });
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateCourse = async () => {
    if (!token) return;
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const payload = {
        name: newCourse.name.trim(),
        description: newCourse.description.trim(),
        price: Number(newCourse.price),
        discount: Number(newCourse.discount) || 0,
        accessLink: newCourse.accessLink.trim() || undefined,
        accessCode: newCourse.accessCode.trim() || undefined,
        imageUrl: newCourse.imageUrl.trim() || undefined,
        duration: newCourse.duration.trim(),
      };

      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        if (resp.status === 401) {
          setCreateError('Unauthorized');
        } else {
          const data = await resp.json().catch(() => ({}));
          setCreateError(data.message || `Failed (${resp.status})`);
        }
        return;
      }
      setCreateSuccess('Course created successfully');
      resetForm();
      setTimeout(() => setShowModal(false), 1200);
    } catch (e) {
      setCreateError((e as Error).message);
    } finally {
      setCreating(false);
    }
  };

  const handleUploadImage = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      setCreateError('Cloudinary not configured');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    setCreateError(null);
  try {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', uploadPreset);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/upload`);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
  interface CloudinaryUploadResp { secure_url: string }
  const uploadPromise: Promise<CloudinaryUploadResp> = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try { resolve(JSON.parse(xhr.responseText)); } catch (err) { reject(err); }
            } else {
              reject(new Error('Upload failed'));
            }
          }
        };
        xhr.onerror = () => reject(new Error('Upload error'));
      });
      xhr.send(form);
      const result = await uploadPromise;
  setNewCourse(c => ({ ...c, imageUrl: result.secure_url }));
  setUploadProgress(100);
  setCreateSuccess('Image uploaded');
    } catch (e) {
      setCreateError((e as Error).message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      <header className="bg-[#2d1847]/80 backdrop-blur-md shadow-sm border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-200">All Courses</h1>
          <button
            onClick={() => window.history.back()}
            className="px-3 py-2 rounded-lg bg-purple-900/60 text-purple-200 hover:bg-purple-900/80 focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center gap-1"
            aria-label="Go Back"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" /> Go Back
          </button>
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
              placeholder="Search by course name, description, or duration..."
              className="px-3 py-2 rounded bg-[#1a1333] text-white border border-purple-900 focus-visible:ring-2 focus-visible:ring-purple-400"
            />
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-purple-900 bg-[#2d1847]/60 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Course Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Enrollments
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-purple-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCourses.map((c: Course) => {
                  const discountedPrice = c.amount - (c.amount * c.discount) / 100;
                  const hasDiscount = c.discount > 0;

                  return (
                    <tr
                      key={c.id}
                      className="border-b border-purple-900 hover:bg-purple-900/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-white font-medium">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-purple-200 max-w-xs truncate">
                        {c.description}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {hasDiscount ? (
                          <div className="flex flex-col">
                            <span className="text-green-300 font-bold">
                              ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-red-300 line-through text-xs">
                              ${c.amount.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-white font-bold">
                            ${c.amount.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-purple-200">
                        {c.duration}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-300 font-bold">
                        {c.enrollCount}
                      </td>
                      <td className="px-4 py-3 text-sm flex gap-2">
                        <button
                          onClick={() => handleEdit(c.id)}
                          className="p-1 rounded hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          aria-label={`Edit ${c.name}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1 rounded hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-400"
                          aria-label={`Delete ${c.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
              Provide course details. All required fields must be completed.
            </p>
            {createError && (
              <div className="mb-4 text-sm text-red-300 bg-red-900/40 border border-red-800 px-3 py-2 rounded">{createError}</div>
            )}
            {createSuccess && (
              <div className="mb-4 text-sm text-green-300 bg-green-900/30 border border-green-800 px-3 py-2 rounded">{createSuccess}</div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateCourse();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse(c => ({ ...c, name: e.target.value }))}
                placeholder="Course Name"
                required
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse(c => ({ ...c, description: e.target.value }))}
                placeholder="Description"
                rows={3}
                required
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-y"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-purple-300 mb-1">Price (NGN)</label>
                  <input
                    type="number"
                    min={0}
                    value={newCourse.price}
                    onChange={(e) => setNewCourse(c => ({ ...c, price: e.target.value }))}
                    placeholder="50000"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newCourse.discount}
                    onChange={(e) => setNewCourse(c => ({ ...c, discount: e.target.value }))}
                    placeholder="10"
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <input
                type="text"
                value={newCourse.duration}
                onChange={(e) => setNewCourse(c => ({ ...c, duration: e.target.value }))}
                placeholder="Duration (e.g. 4 weeks)"
                required
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="url"
                value={newCourse.accessLink}
                onChange={(e) => setNewCourse(c => ({ ...c, accessLink: e.target.value }))}
                placeholder="Access Link (optional)"
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                value={newCourse.accessCode}
                onChange={(e) => setNewCourse(c => ({ ...c, accessCode: e.target.value }))}
                placeholder="Access Code (optional)"
                className="px-3 py-2 rounded-lg bg-[#1a1333]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div>
                <label className="block text-xs text-purple-300 mb-1">Course Cover Image</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!file.type.startsWith('image/')) {
                            setCreateError('Only image files allowed');
                            return;
                          }
                          handleUploadImage(file);
                        }
                      }}
                      className="text-sm text-purple-200 file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-purple-800/60 file:text-purple-200 hover:file:bg-purple-800/80 cursor-pointer"
                    />
                    {newCourse.imageUrl && !uploading && (
                      <span className="text-xs text-green-300 truncate max-w-[140px]">Image uploaded</span>
                    )}
                  </div>
                  {uploading && (
                    <div className="w-full">
                      <div className="h-2 w-full bg-purple-900/40 rounded overflow-hidden">
                        <div
                          className="h-2 bg-purple-500 transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="text-[10px] mt-1 text-purple-300 tracking-wide">
                        Uploading {uploadProgress}%
                      </div>
                    </div>
                  )}
                  {newCourse.imageUrl && !uploading && (
                    <div className="flex items-center gap-3">
                      {/* Simple preview */}
                      {/* Using next/image for optimization; using unoptimized to avoid layout shift in modal */}
                      <div className="h-14 w-20 relative rounded overflow-hidden border border-purple-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={newCourse.imageUrl}
                          alt="Course cover preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setNewCourse(c => ({ ...c, imageUrl: '' }));
                          if (fileInputRef.current) fileInputRef.current.value='';
                        }}
                        className="text-xs px-2 py-1 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded"
                      >Remove</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 rounded-lg bg-red-900/60 text-red-200 hover:bg-red-900/80 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-60"
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || uploading}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold disabled:opacity-60"
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
