import useSWR from "swr";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export interface Course {
  id: string;
  title: string;
  instructor?: string;
  instructorName?: string;
  status?: string;
  createdAt?: string;
  // ...other fields as needed
}

export interface AdminCoursesResponse {
  status: boolean;
  message: string;
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
  const { data, error, isLoading } = useSWR<AdminCoursesResponse, Error>(
    shouldFetch ? [`${BASE_URL}/courses`, token] : null,
    ([url, token]: [string, string]) => fetchAdminCourses(url, token)
  );
  return {
    courses: data?.courses || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
