import useSWR from "swr";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchSuperAdminAdmins(url: string, token: string) {
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
  if (!res.ok) throw new Error("Failed to fetch admins");
  return res.json();
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function useSuperAdminAdmins(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const { data, error, isLoading } = useSWR<
    { admins: AdminUser[] } | AdminUser[],
    Error
  >(
    shouldFetch ? [`${BASE_URL}/admin/admins`, token] : null,
    ([url, token]: [string, string]) => fetchSuperAdminAdmins(url, token)
  );
  let admins: AdminUser[] = [];
  if (Array.isArray(data)) {
    admins = data;
  } else if (data?.admins && Array.isArray(data.admins)) {
    admins = data.admins;
  }
  return {
    admins,
    isLoading,
    error,
  };
}
