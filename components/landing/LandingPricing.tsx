import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface PricingCardProps {
  title: string;
  price: string;
  color: string;
  features: string[];
  ariaLabel: string;
  highlight?: boolean;
  highlightText?: string;
  interval?: string;
  description?: string | null;
}

function PricingCard({
  title,
  price,
  color,
  features,
  ariaLabel,
  highlight = false,
  highlightText,
  interval,
  description,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center outline-none focus-visible:ring-4 focus-visible:ring-lime-400 focus-visible:ring-opacity-50 ${
        highlight ? "border-2 border-lime-400 relative" : ""
      }`}
      role="region"
      aria-labelledby={`plan-${title.toLowerCase()}`}
      aria-describedby={`plan-${title.toLowerCase()}-desc`}
    >
      {highlight && (
        <div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-lime-600 text-white px-4 py-1 rounded-full text-sm font-semibold"
          aria-label={highlightText}
          tabIndex={-1}
        >
          <span className="sr-only">{highlightText}</span>
          {highlightText}
        </div>
      )}
      <h3
        id={`plan-${title.toLowerCase()}`}
        className="text-2xl font-bold text-white mb-4"
      >
        {title}
      </h3>
      <div className={`text-4xl font-bold ${color} mb-2`}>
        ₦{price}
        <span className="text-lg text-gray-100">/{interval || "month"}</span>
      </div>
      {description && (
        <div className="text-gray-300 text-sm mb-4">{description}</div>
      )}
      <ul
        id={`plan-${title.toLowerCase()}-desc`}
        className="space-y-3 text-lg text-gray-100 mb-8"
      >
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`block bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50`}
        aria-label={ariaLabel}
      >
        Get Started
      </Link>
    </div>
  );
}

interface ApiPlan {
  id: string;
  name: string;
  plan_code: string;
  interval: string;
  amount: number;
  description: string | null;
}

const staticFeatures: Record<string, string[]> = {
  "Basic Signals": [
    "Daily trading signals",
    "Basic market analysis",
    "Community access",
  ],
  "Premium Signals": [
    "Everything in Basic",
    "Advanced analysis",
    "Course access",
    "Priority support",
  ],
  "Ultra Signals": [
    "Everything in Premium",
    "1-on-1 mentoring",
    "Custom strategies",
    "VIP access",
  ],
};

const colorMap: Record<string, string> = {
  "Basic Signals": "text-green-400",
  "Premium Signals": "text-lime-400",
  "Ultra Signals": "text-emerald-400",
};

export function LandingPricing() {
  const [plans, setPlans] = useState<PricingCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
    axios
      .get(`${baseUrl}/subscription/plan`)
      .then((response) => {
        const data = response.data;
        if (!data?.status) throw new Error("Failed to load plans");
        const mapped = data.data.map((plan: ApiPlan) => ({
          title: plan.name,
          price: plan.amount.toLocaleString(),
          color: colorMap[plan.name] || "text-emerald-400",
          features: staticFeatures[plan.name] || ["Signal access"],
          ariaLabel: `Get Started with ${plan.name}`,
          interval: plan.interval,
          description: plan.description,
          highlight: plan.name === "Premium Signals",
          highlightText:
            plan.name === "Premium Signals" ? "Most Popular Plan" : undefined,
        }));
        setPlans(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plans.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto text-center text-white">
          Loading plans...
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="pricing" className="px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto text-center text-red-400">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="px-4 py-16 md:py-20"
      aria-labelledby="pricing-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="pricing-title"
          className="text-4xl font-bold text-white text-center mb-12 md:mb-16"
        >
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
