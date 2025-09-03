import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MagnifyingGlassIcon, BookOpenIcon, ClockIcon, UserIcon, CheckCircleIcon, PlayIcon } from "@heroicons/react/24/outline";

export interface CourseItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  discount: number;
  imageUrl?: string;
  duration: string;
  enrollCount: number;
}

export interface EnrolledCourseItem extends CourseItem {
  enrolledAt: string;
  progress?: number;
  status: 'active' | 'completed' | 'expired';
}

type CoursesResponse = CourseItem[];
type EnrolledCoursesResponse = EnrolledCourseItem[];

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchCourses(url: string, token: string): Promise<CoursesResponse> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (res.status === 401) {
    console.log("401 Unauthorized - Signing out user");
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

async function fetchEnrolledCourses(url: string, token: string): Promise<EnrolledCoursesResponse> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (res.status === 401) {
    console.log("401 Unauthorized - Signing out user");
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch enrolled courses");
  return res.json();
}

export function UserCourses() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Fetch courses
  const { data: coursesData, error: coursesError, isLoading: coursesLoading } = useSWR<CoursesResponse>(
    token && BASE_URL ? [`${BASE_URL}/courses/`, token] : null,
    ([url, token]: [string, string]) => fetchCourses(url, token)
  );

  // Fetch enrolled courses
  const { data: enrolledCoursesData, error: enrolledCoursesError, isLoading: enrolledCoursesLoading } = useSWR<EnrolledCoursesResponse>(
    token && BASE_URL ? [`${BASE_URL}/courses/my`, token] : null,
    ([url, token]: [string, string]) => fetchEnrolledCourses(url, token)
  );

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Enrollment state
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<string | null>(null);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

  // Payment callback state
  const [paymentMessage, setPaymentMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle payment callback from URL parameters
  useEffect(() => {
    // Get URL parameters (this is a client-side effect)
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    const reference = urlParams.get('reference');
    const error = urlParams.get('error');

    if (payment === 'success' && reference) {
      setPaymentMessage({
        type: 'success',
        message: `Payment successful! Your transaction has been completed. Reference: ${reference}`
      });

      // Clear URL parameters
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('payment');
      newUrl.searchParams.delete('reference');
      newUrl.searchParams.delete('courseId');
      window.history.replaceState({}, '', newUrl.toString());

      // Clear message after 10 seconds
      setTimeout(() => {
        setPaymentMessage(null);
      }, 10000);

    } else if (payment === 'failed' || payment === 'error' || error) {
      const errorMessage = error === 'payment_verification_failed'
        ? 'Payment verification failed. Please contact support if you were charged.'
        : 'Payment was not completed successfully. Please try again.';

      setPaymentMessage({
        type: 'error',
        message: errorMessage
      });

      // Clear URL parameters
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('payment');
      newUrl.searchParams.delete('reference');
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());

      // Clear message after 10 seconds
      setTimeout(() => {
        setPaymentMessage(null);
      }, 10000);
    }
  }, []);

  // Handle course enrollment
  const handleEnrollCourse = async (courseId: string, courseName: string) => {
    if (!token || !BASE_URL) return;

    setEnrollingCourseId(courseId);
    setEnrollmentError(null);
    setEnrollmentSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/courses/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          courseId: courseId,
          callbackUrl: `${window.location.origin}/user/dashboard`,
        }),
      });

      if (response.status === 401) {
        console.log("401 Unauthorized - Signing out user");
        await signOut({ callbackUrl: "/login" });
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to enroll in course");
      }

      const result = await response.json();

      // Check if payment is required
      if (result.payment && result.payment.paymentUrl) {
        // Open payment URL in new tab/window
        window.open(result.payment.paymentUrl, '_blank', 'noopener,noreferrer');

        setEnrollmentSuccess(`Payment initiated for "${courseName}". Complete your payment to enroll.`);

        // Clear success message after 10 seconds
        setTimeout(() => {
          setEnrollmentSuccess(null);
        }, 10000);
      } else {
        // Direct enrollment without payment
        setEnrollmentSuccess(`Successfully enrolled in "${courseName}"!`);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setEnrollmentSuccess(null);
        }, 5000);
      }

    } catch (err: unknown) {
      let errorMessage = "Failed to enroll in course. Please try again.";

      if (err && typeof err === "object" && "message" in err) {
        errorMessage = (err as Error).message;
      }

      setEnrollmentError(errorMessage);

      // Clear error message after 5 seconds
      setTimeout(() => {
        setEnrollmentError(null);
      }, 5000);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    const courses = coursesData || [];
    return courses.filter((course) => {
      // Search filter
      const matchesSearch = debouncedSearchTerm === "" ||
        course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        course.duration.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [coursesData, debouncedSearchTerm]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">My Courses</h2>
        <p className="text-sm text-lime-200">View your enrolled courses and explore new ones</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-3 text-sm text-lime-200">
          Showing {filteredCourses.length} of {coursesData?.length || 0} courses
          {debouncedSearchTerm && (
            <span className="ml-2">for &quot;{debouncedSearchTerm}&quot;</span>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Success/Error Messages */}
        {enrollmentSuccess && (
          <div className="mb-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
            <p className="text-green-400 text-sm">{enrollmentSuccess}</p>
          </div>
        )}

        {enrollmentError && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
            <p className="text-red-400 text-sm">{enrollmentError}</p>
          </div>
        )}

        {paymentMessage && (
          <div className={`mb-4 p-4 rounded-lg border ${
            paymentMessage.type === 'success'
              ? 'bg-green-600/20 border-green-600/30'
              : 'bg-red-600/20 border-red-600/30'
          }`}>
            <p className={`text-sm ${
              paymentMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {paymentMessage.message}
            </p>
          </div>
        )}

        {/* Enrolled Courses Section */}
        {(enrolledCoursesData && enrolledCoursesData.length > 0) && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">My Enrolled Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesData.map((course) => {
                const enrolledDate = course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : 'Unknown';
                const courseStatus = course.status || 'active'; // Default to 'active' if status is undefined

                return (
                  <div
                    key={course.id}
                    className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {/* Course Thumbnail */}
                    <div className="aspect-video bg-slate-800 relative">
                      {course.imageUrl ? (
                        <Image
                          src={course.imageUrl}
                          alt={course.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpenIcon className="h-12 w-12 text-lime-400" />
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                        courseStatus === 'active' ? 'bg-green-600 text-white' :
                        courseStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-yellow-600 text-white'
                      }`}>
                        {courseStatus.charAt(0).toUpperCase() + courseStatus.slice(1)}
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {course.name}
                      </h4>

                      <p className="text-lime-200 text-sm mb-3 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-lime-300">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center text-sm text-lime-300">
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          <span>Enrolled: {enrolledDate}</span>
                        </div>

                        {course.progress !== undefined && (
                          <div className="flex items-center text-sm text-lime-300">
                            <PlayIcon className="h-4 w-4 mr-2" />
                            <span>Progress: {course.progress}%</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-white font-bold text-lg">
                          Enrolled
                        </div>

                        <button
                          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading enrolled courses */}
        {enrolledCoursesLoading && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">My Enrolled Courses</h3>
            <div className="text-white">Loading your enrolled courses...</div>
          </div>
        )}

        {/* Error loading enrolled courses */}
        {enrolledCoursesError && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">My Enrolled Courses</h3>
            <div className="text-red-400">Failed to load enrolled courses</div>
          </div>
        )}

        {/* Available Courses Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">Available Courses</h3>
          <p className="text-sm text-lime-200">Explore our comprehensive trading courses</p>
        </div>

        {coursesLoading ? (
          <div className="text-white">Loading courses...</div>
        ) : coursesError ? (
          <div className="text-red-400">Failed to load courses</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-400 mb-4" />
                <p className="text-white text-lg font-medium">No courses found</p>
                <p className="text-lime-200">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredCourses.map((course) => {
                // Calculate discounted price
                const originalPrice = course.amount;
                const discountAmount = (originalPrice * course.discount) / 100;
                const discountedPrice = originalPrice - discountAmount;
                const hasDiscount = course.discount > 0;
                const isEnrolling = enrollingCourseId === course.id;

                return (
                  <div
                    key={course.id}
                    className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {/* Course Thumbnail */}
                    <div className="aspect-video bg-slate-800 relative">
                      {course.imageUrl ? (
                        <Image
                          src={course.imageUrl}
                          alt={course.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpenIcon className="h-12 w-12 text-lime-400" />
                        </div>
                      )}

                      {/* Discount Badge */}
                      {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {course.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {course.name}
                      </h3>

                      <p className="text-lime-200 text-sm mb-3 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-lime-300">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center text-sm text-lime-300">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span>{course.enrollCount} enrolled</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {hasDiscount ? (
                            <>
                              <div className="text-white font-bold text-lg">
                                ${discountedPrice.toFixed(2)}
                              </div>
                              <div className="text-sm text-lime-300 line-through">
                                ${originalPrice.toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="text-white font-bold text-lg">
                              ${originalPrice.toFixed(2)}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleEnrollCourse(course.id, course.name)}
                          disabled={isEnrolling}
                          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 disabled:bg-lime-800 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          {isEnrolling ? "Enrolling..." : "Enroll Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
