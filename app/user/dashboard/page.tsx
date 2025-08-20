"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { RecentSignalUpdates } from "@/components/dashboard/RecentSignalUpdates";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      <DashboardHeader user={session.user} onLogout={handleLogout} />
      <section
        className="max-w-7xl mx-auto px-4 py-8"
        aria-labelledby="dashboard-section-title"
      >
        <h1 id="dashboard-section-title" className="sr-only">
          User dashboard
        </h1>
        <div className="space-y-8">
          <StatsCards />
          <QuickActions />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTransactions />
            <RecentSignalUpdates />
          </div>
        </div>
      </section>
    </div>
  );
}
