import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Apex FX - Premium Trading Signals & Education",
  description:
    "Get premium forex trading signals, courses, and join our exclusive community",
};

export default function LandingPage() {
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
