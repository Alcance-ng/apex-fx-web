"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UserCourses } from "@/components/dashboard/UserCourses";

export default function UserCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => router.push("/user/dashboard")}
            className="text-sm text-lime-200 hover:text-white inline-flex items-center gap-2"
          >
            ← Back to dashboard
          </button>
        </div>

        <UserCourses />
      </section>
    </div>
  );
}
