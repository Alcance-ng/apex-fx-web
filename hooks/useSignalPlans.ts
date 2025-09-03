import useSWR from "swr";
import { signOut } from "next-auth/react";
import { APP_CONFIG } from "@/lib/constants";

export interface SignalPlan {
  id: string;
  name: string;
  plan_code: string;
  interval: string;
  amount: number;
  description: string | null;
}

export interface SignalPlansResponse {
  status: boolean;
  message: string;
  data: SignalPlan[];
}

async function fetchSignalPlans(url: string, token: string) {
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
  if (!res.ok) throw new Error("Failed to fetch signal plans");
  return res.json();
}

export function useSignalPlans(token?: string) {
  const shouldFetch = !!token && !!APP_CONFIG.api.baseUrl;
  const { data, error, isLoading } = useSWR<SignalPlansResponse, Error>(
    shouldFetch ? [`${APP_CONFIG.api.baseUrl}/subscription/plan`, token] : null,
    ([url, token]: [string, string]) => fetchSignalPlans(url, token)
  );
  return {
    plans: data?.data || [],
    isLoading,
    error,
  };
}
