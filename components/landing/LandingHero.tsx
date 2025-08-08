import Image from "next/image";
import Link from "next/link";

export function LandingHero() {
  return (
    <section
      className="w-full min-h-screen flex items-center px-4 py-10 md:py-20 bg-transparent overflow-hidden"
      aria-labelledby="hero-title"
      aria-describedby="hero-desc"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full h-full">
        {/* Image left */}
        <div className="relative w-full h-64 md:h-[400px] flex justify-center items-center overflow-hidden">
          <Image
            src="/trade.jpg"
            alt="A diverse group of traders analyzing forex charts on multiple screens in a bright, accessible workspace."
            fill
            className="object-cover object-center rounded-2xl shadow-2xl"
            priority
          />
        </div>
        {/* Text right */}
        <div className="flex flex-col justify-center w-full">
          <h1
            id="hero-title"
            className="text-4xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="sr-only">
              Apex FX - Premium Trading Signals &amp; Education
            </span>
            Premium Trading
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">
              Signals &amp; Education
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl"
            id="hero-desc"
          >
            Join thousands of successful traders with our premium forex signals,
            comprehensive courses, and exclusive community access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              href="/register"
              className="flex-1 bg-gradient-to-r from-green-600 to-lime-600 text-white px-8 py-4 rounded-lg text-lg font-semibold text-center hover:from-green-700 hover:to-lime-700 transition-all motion-safe:hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50 motion-reduce:transition-none"
              aria-label="Start Trading Now - Register for Apex FX"
            >
              Start Trading Now
            </Link>
            <Link
              href="#pricing"
              className="flex-1 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold text-center hover:bg-white hover:text-gray-900 transition-all focus:outline-none focus:ring-4 focus:ring-lime-400 focus:ring-opacity-50 motion-reduce:transition-none"
              aria-label="View Pricing Plans"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
