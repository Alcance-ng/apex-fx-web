"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-lime-50 flex items-center justify-center">
        {" "}
        {/* changed bg to lime-50 */}
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>{" "}
          {/* changed border to lime-500 */}
          <p className="text-lime-600">Loading...</p>{" "}
          {/* changed text to lime-600 */}
        </div>
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <StatsCards />
          <QuickActions />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
}
