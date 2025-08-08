import Image from "next/image";
import {
  ChartBarIcon,
  AcademicCapIcon,
  UsersIcon,
} from "@/components/landing/FeatureIcons";

export function LandingFeatures() {
  return (
    <section className="px-4 py-8 md:py-12 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text left */}
        <div>
          <h2 className="text-4xl font-bold text-white text-left mb-8 md:mb-12">
            Why Choose Apex FX?
          </h2>
          <ul className="space-y-8">
            <li className="flex items-start gap-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mt-1">
                <ChartBarIcon
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Premium Signals
                </h3>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Daily high-quality trading signals with detailed analysis and
                  risk management.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-6">
              <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center mt-1">
                <AcademicCapIcon
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Expert Education
                </h3>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Comprehensive courses from beginner to advanced trading
                  strategies.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mt-1">
                <UsersIcon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Exclusive Community
                </h3>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Access to private Telegram and Discord groups with fellow
                  traders.
                </p>
              </div>
            </li>
          </ul>
        </div>
        {/* Image right */}
        <div className="flex justify-center">
          <Image
            src="/trade.jpg"
            alt="A diverse group of traders analyzing forex charts on multiple screens in a bright, accessible workspace."
            width={600}
            height={600}
            className="rounded-2xl shadow-2xl max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
