import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MagnifyingGlassIcon, BookOpenIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  thumbnailUrl?: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

type CoursesResponse = CourseItem[];

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchCourses(url: string, token: string): Promise<CoursesResponse> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (res.status === 401) {
    console.log("401 Unauthorized - Signing out user");
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export function UserCourses() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Fetch courses
  const { data: coursesData, error: coursesError, isLoading: coursesLoading } = useSWR<CoursesResponse>(
    token && BASE_URL ? [`${BASE_URL}/courses/`, token] : null,
    ([url, token]: [string, string]) => fetchCourses(url, token)
  );

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get unique categories
  const categories = useMemo(() => {
    const courses = coursesData || [];
    const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));
    return uniqueCategories;
  }, [coursesData]);

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    const courses = coursesData || [];
    return courses.filter((course) => {
      // Search filter
      const matchesSearch = debouncedSearchTerm === "" ||
        course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      // Level filter
      const matchesLevel = filterLevel === "all" || course.level === filterLevel;

      // Category filter
      const matchesCategory = filterCategory === "all" || course.category === filterCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [coursesData, debouncedSearchTerm, filterLevel, filterCategory]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Courses</h2>
        <p className="text-sm text-lime-200">Explore our comprehensive trading courses</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Level Filter */}
            <div className="relative">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as "all" | "beginner" | "intermediate" | "advanced")}
                className="pl-3 pr-8 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent appearance-none"
              >
                <option value="all" className="bg-slate-800">All Levels</option>
                <option value="beginner" className="bg-slate-800">Beginner</option>
                <option value="intermediate" className="bg-slate-800">Intermediate</option>
                <option value="advanced" className="bg-slate-800">Advanced</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent appearance-none"
              >
                <option value="all" className="bg-slate-800">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-3 text-sm text-lime-200">
          Showing {filteredCourses.length} of {coursesData?.length || 0} courses
          {debouncedSearchTerm && (
            <span className="ml-2">for &quot;{debouncedSearchTerm}&quot;</span>
          )}
        </div>
      </div>

      <div className="p-6">
        {coursesLoading ? (
          <div className="text-white">Loading courses...</div>
        ) : coursesError ? (
          <div className="text-red-400">Failed to load courses</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-400 mb-4" />
                <p className="text-white text-lg font-medium">No courses found</p>
                <p className="text-lime-200">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {/* Course Thumbnail */}
                  <div className="aspect-video bg-slate-800 relative">
                    {course.thumbnailUrl ? (
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpenIcon className="h-12 w-12 text-lime-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-lime-200 text-sm mb-3 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-lime-300">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span>{course.instructor}</span>
                      </div>

                      <div className="flex items-center text-sm text-lime-300">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>

                      <div className="text-sm text-lime-300">
                        <span className="font-medium">{course.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-white font-bold text-lg">
                        ${course.price}
                      </div>

                      <button className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
