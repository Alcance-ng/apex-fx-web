import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, AcademicCapIcon, ChartBarIcon, SparklesIcon, BookOpenIcon, ChartBarSquareIcon, ClockIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSignalPlans } from "@/hooks/useSignalPlans";
import { useSession } from "next-auth/react";

interface Course {
  id: string;
  name: string;
  description: string;
  amount: number;
  discount: number;
  imageUrl?: string;
  duration: string;
  enrollCount: number;
}

interface FeaturedItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  imageUrl?: string;
  type: 'course' | 'signal';
  duration?: string;
  interval?: string;
  plan_code?: string;
}

interface FeaturedCarouselProps {
  courses?: Course[];
}

export function FeaturedCarousel({ courses = [] }: FeaturedCarouselProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { plans: allSignalPlans } = useSignalPlans(session?.accessToken);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Combine courses and signal plans into featured items
  const featuredItems: FeaturedItem[] = [
    ...courses.slice(0, 3).map(course => ({
      ...course,
      type: 'course' as const,
    })),
    ...allSignalPlans.slice(0, 3).map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description || '',
      amount: plan.amount,
      type: 'signal' as const,
      interval: plan.interval,
      plan_code: plan.plan_code,
    })),
  ];

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerView >= featuredItems.length ? 0 : prevIndex + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerView < 0 ? Math.max(0, featuredItems.length - itemsPerView) : prevIndex - itemsPerView
    );
  };

  if (featuredItems.length === 0) {
    return null;
  }

  const visibleItems = featuredItems.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="bg-gradient-to-br from-white/5 via-white/8 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[420px] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Featured Content</h2>
              <p className="text-sm text-lime-200/80">Discover our latest courses and signal plans</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-gradient-to-r from-emerald-600/80 to-lime-600/80 hover:from-emerald-500/90 hover:to-lime-500/90 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={currentIndex === 0}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-gradient-to-r from-emerald-600/80 to-lime-600/80 hover:from-emerald-500/90 hover:to-lime-500/90 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={currentIndex + itemsPerView >= featuredItems.length}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 items-start">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              // Navigate to checkout page with item details
              const params = new URLSearchParams({
                id: item.id,
                name: item.name,
                description: item.description,
                amount: item.amount.toString(),
                type: item.type,
                ...(item.duration && { duration: item.duration }),
                ...(item.interval && { interval: item.interval }),
                ...(item.plan_code && { plan_code: item.plan_code }),
              });
              router.push(`/checkout?${params.toString()}`);
            }}
            className="group block h-full cursor-pointer"
          >
            <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl p-6 hover:from-white/20 hover:to-white/10 transition-all duration-500 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 h-80 flex flex-col cursor-pointer">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  {item.imageUrl ? (
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-lime-500/20"></div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 via-lime-500 to-green-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {item.type === 'course' ? (
                        <AcademicCapIcon className="h-8 w-8 text-white" />
                      ) : (
                        <ChartBarIcon className="h-8 w-8 text-white" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'course'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-200 border border-blue-400/30'
                        : 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-200 border border-green-400/30'
                    }`}>
                      {item.type === 'course' ? (
                        <>
                          <BookOpenIcon className="h-3 w-3 mr-1" />
                          Course
                        </>
                      ) : (
                        <>
                          <ChartBarSquareIcon className="h-3 w-3 mr-1" />
                          Signal Plan
                        </>
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-lime-200 transition-colors duration-300 line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <p className="text-sm text-lime-200/80 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 mb-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    ${item.amount}
                  </span>
                  <span className="text-xs text-lime-300/70">
                    {item.type === 'course' ? 'One-time payment' : 'Subscription'}
                  </span>
                </div>
                <div className="text-right">
                  {item.type === 'course' && item.duration && (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 text-xs font-medium border border-emerald-400/30">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {item.duration}
                    </span>
                  )}
                  {item.type === 'signal' && item.interval && (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-lime-500/20 text-lime-200 text-xs font-medium border border-lime-400/30">
                      <ArrowPathIcon className="h-3 w-3 mr-1" />
                      {item.interval}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm text-center transition-all duration-300 cursor-pointer ${
                  item.type === 'course'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {item.type === 'course' ? 'Enroll Now' : 'Subscribe'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced dots indicator */}
      <div className="flex justify-center space-x-3">
        {Array.from({ length: Math.ceil(featuredItems.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView)}
            className={`transition-all duration-300 rounded-full ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'w-8 h-3 bg-gradient-to-r from-lime-400 to-emerald-400 shadow-lg'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
