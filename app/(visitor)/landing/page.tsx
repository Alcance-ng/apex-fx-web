"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/user/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      <div className="sticky top-0 z-20">
        <LandingHeader />
      </div>
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingFooter />
    </div>
  );
}
