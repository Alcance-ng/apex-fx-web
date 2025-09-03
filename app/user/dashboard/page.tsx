"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { signOut } from "next-auth/react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { RecentSignalUpdates } from "@/components/dashboard/RecentSignalUpdates";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface UserMeResponse {
  planCode: string;
}

interface SignalItem {
  id: string;
  signalPlanId: string;
  timeFrame: string;
  instructions: string;
  fileUrlBefore: string | null;
  fileUrlAfter: string | null;
  createdAt: string;
  updatedAt: string;
}

type SignalUpdatesResponse = SignalItem[];

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchUserMe(url: string, token: string): Promise<UserMeResponse> {
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
  if (!res.ok) throw new Error("Failed to fetch user info");
  return res.json();
}

async function fetchSignalUpdates(url: string, token: string): Promise<SignalUpdatesResponse> {
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
  if (!res.ok) throw new Error("Failed to fetch signal updates");
  return res.json();
}

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const token = session?.accessToken;

  // Fetch user info to get planCode
  const { data: userData } = useSWR<UserMeResponse>(
    token && BASE_URL ? [`${BASE_URL}/users/me`, token] : null,
    ([url, token]: [string, string]) => fetchUserMe(url, token)
  );

  // Fetch signal updates using planCode
  const { data: updatesData } = useSWR<SignalUpdatesResponse>(
    userData?.planCode && token && BASE_URL ? [`${BASE_URL}/signal/${userData.planCode}/updates`, token] : null,
    ([url, token]: [string, string]) => fetchSignalUpdates(url, token)
  );

  const activeSignalsCount = updatesData ? updatesData.length : 0;

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-lime-50 flex items-center justify-center">
        <LoadingSpinner text="Please wait..." />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      <DashboardHeader user={session.user} />
      <section
        className="max-w-7xl mx-auto px-4 py-8"
        aria-labelledby="dashboard-section-title"
      >
        <h1 id="dashboard-section-title" className="sr-only">
          User dashboard
        </h1>
        <div className="space-y-8">
          <StatsCards activeSignals={activeSignalsCount} />
          <QuickActions />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentSignalUpdates />
            <RecentTransactions />
           
          </div>
        </div>
      </section>
    </div>
  );
}
