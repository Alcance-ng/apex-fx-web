import useSWR from "swr";
import { APP_CONFIG } from "@/lib/constants";
import { signOut } from "next-auth/react";

export interface SignalHistoryItem {
  id: string;
  planCode: string;
  timeFrame: string;
  instructions: string;
  fileUrlBefore?: string;
  createdAt: string;
  updatedAt: string;
}

interface SignalHistoryResponse {
  status: boolean;
  message: string;
  data: SignalHistoryItem[];
}

async function fetchSignalHistory(url: string, token: string) {
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
  if (!res.ok) throw new Error("Failed to fetch signal history");
  return res.json();
}

export function useSignalHistory(token?: string, limit: number = 5) {
  const shouldFetch = !!token && !!APP_CONFIG.api.baseUrl;
  const { data, error, isLoading, mutate } = useSWR<SignalHistoryResponse, Error>(
    shouldFetch ? [`${APP_CONFIG.api.baseUrl}/signal/updates?limit=${limit}`, token] : null,
    ([url, token]: [string, string]) => fetchSignalHistory(url, token)
  );
  return {
    signals: data?.data || [],
    isLoading,
    error,
    mutate,
  };
}
