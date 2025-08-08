import Link from "next/link";

export function LandingPricing() {
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
          {/* Basic Plan */}
          <div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center outline-none focus-visible:ring-4 focus-visible:ring-lime-400 focus-visible:ring-opacity-50"
            role="region"
            aria-labelledby="plan-basic"
            aria-describedby="plan-basic-desc"
          >
            <h3 id="plan-basic" className="text-2xl font-bold text-white mb-4">
              Basic
            </h3>
            <div className="text-4xl font-bold text-green-400 mb-6">
              ₦10,000
              <span className="text-lg text-gray-100">/month</span>
            </div>
            <ul
              id="plan-basic-desc"
              className="space-y-3 text-lg text-gray-100 mb-8"
            >
              <li>Daily trading signals</li>
              <li>Basic market analysis</li>
              <li>Community access</li>
            </ul>
            <Link
              href="/register"
              className="block bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50"
              aria-label="Get Started with Basic Plan"
            >
              Get Started
            </Link>
          </div>
          {/* Standard Plan */}
          <div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border-2 border-lime-400 relative outline-none focus-visible:ring-4 focus-visible:ring-lime-400 focus-visible:ring-opacity-50"
            role="region"
            aria-labelledby="plan-standard"
            aria-describedby="plan-standard-desc"
          >
            <div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-lime-600 text-white px-4 py-1 rounded-full text-sm font-semibold"
              aria-label="Most Popular"
              tabIndex={-1}
            >
              <span className="sr-only">Most Popular Plan</span>
              Most Popular
            </div>
            <h3
              id="plan-standard"
              className="text-2xl font-bold text-white mb-4"
            >
              Standard
            </h3>
            <div className="text-4xl font-bold text-lime-400 mb-6">
              ₦25,000
              <span className="text-lg text-gray-100">/month</span>
            </div>
            <ul
              id="plan-standard-desc"
              className="space-y-3 text-lg text-gray-100 mb-8"
            >
              <li>Everything in Basic</li>
              <li>Advanced analysis</li>
              <li>Course access</li>
              <li>Priority support</li>
            </ul>
            <Link
              href="/register"
              className="block bg-lime-600 text-white py-3 rounded-lg hover:bg-lime-700 transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50"
              aria-label="Get Started with Standard Plan"
            >
              Get Started
            </Link>
          </div>
          {/* Premium Plan */}
          <div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center outline-none focus-visible:ring-4 focus-visible:ring-lime-400 focus-visible:ring-opacity-50"
            role="region"
            aria-labelledby="plan-premium"
            aria-describedby="plan-premium-desc"
          >
            <h3
              id="plan-premium"
              className="text-2xl font-bold text-white mb-4"
            >
              Premium
            </h3>
            <div className="text-4xl font-bold text-emerald-400 mb-6">
              ₦100,000
              <span className="text-lg text-gray-100">/month</span>
            </div>
            <ul
              id="plan-premium-desc"
              className="space-y-3 text-lg text-gray-100 mb-8"
            >
              <li>Everything in Standard</li>
              <li>1-on-1 mentoring</li>
              <li>Custom strategies</li>
              <li>VIP access</li>
            </ul>
            <Link
              href="/register"
              className="block bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50"
              aria-label="Get Started with Premium Plan"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
