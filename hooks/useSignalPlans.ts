import useSWR from "swr";
import { APP_CONFIG } from "@/lib/constants";

async function fetchSignalPlans(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

export interface SignalPlan {
  id: string;
  name: string;
  plan_code: string;
  interval: string;
  amount: number;
  description: string | null;
}

interface SignalPlansResponse {
  status: boolean;
  message: string;
  data: SignalPlan[];
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
