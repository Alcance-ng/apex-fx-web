import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchAdminUsers(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleTags: string[];
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminUsersResponse {
  users: User[];
  analytics: {
    totalUsers: number;
    newUsers: {
      today: number;
      thisWeek: number;
      thisMonth: number;
    };
    activeUsersLast7Days: number;
  };
}

export function useAdminUsers(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const { data, error, isLoading } = useSWR<AdminUsersResponse, Error>(
    shouldFetch ? [`${BASE_URL}/admin/users`, token] : null,
    ([url, token]: [string, string]) => fetchAdminUsers(url, token)
  );
  return {
    users: data?.users || [],
    analytics: data?.analytics || {
      totalUsers: 0,
      newUsers: { today: 0, thisWeek: 0, thisMonth: 0 },
      activeUsersLast7Days: 0,
    },
    isLoading,
    error,
  };
}
