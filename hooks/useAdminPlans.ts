import useSWR from "swr";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export interface SubscriptionPlan {
  id: number;
  name: string;
  active_subscriptions: number;
  total_subscriptions: number;
  total_subscriptions_revenue: number;
  // ...other fields as needed
}

export interface AdminPlansResponse {
  status: boolean;
  message: string;
  data: SubscriptionPlan[];
  meta: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

async function fetchAdminPlans(url: string, token: string) {
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
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

export function useAdminPlans(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const { data, error, isLoading } = useSWR<AdminPlansResponse, Error>(
    shouldFetch ? [`${BASE_URL}/subscription/admin/plans`, token] : null,
    ([url, token]: [string, string]) => fetchAdminPlans(url, token)
  );
  return {
    plans: data?.data || [],
    totalActiveSubscriptions:
      data?.data?.reduce(
        (sum, plan) => sum + (plan.active_subscriptions || 0),
        0
      ) || 0,
    totalSubscriptions:
      data?.data?.reduce(
        (sum, plan) => sum + (plan.total_subscriptions || 0),
        0
      ) || 0,
    totalSubscriptionsRevenue:
      data?.data?.reduce(
        (sum, plan) => sum + (plan.total_subscriptions_revenue || 0),
        0
      ) || 0,
    isLoading,
    error,
  };
}
