import useSWR from "swr";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export interface Course {
  id: string;
  name: string;
  description: string;
  amount: number;
  discount: number;
  imageUrl?: string;
  duration: string;
  enrollCount: number;
}

export interface AdminCoursesResponse {
  courses: Course[];
  meta?: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

async function fetchAdminCourses(url: string, token: string) {
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

export function useAdminCourses(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const { data, error, isLoading } = useSWR<Course[] | AdminCoursesResponse, Error>(
    shouldFetch ? [`${BASE_URL}/courses`, token] : null,
    ([url, token]: [string, string]) => fetchAdminCourses(url, token)
  );

  // Handle both response formats: direct array or object with courses property
  const courses = Array.isArray(data) ? data : data?.courses || [];
  const meta = Array.isArray(data) ? undefined : data?.meta;

  return {
    courses,
    meta,
    isLoading,
    error,
  };
}
