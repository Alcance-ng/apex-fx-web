import React from "react";
import Image from "next/image";

const mockCourses = [
  {
    id: "1",
    title: "Forex Fundamentals",
    instructor: "Jane Doe",
    status: "active",
    image: "/trade.jpg",
  },
  {
    id: "2",
    title: "Advanced Trading Strategies",
    instructor: "John Smith",
    status: "inactive",
    image: "/globe.svg",
  },
  {
    id: "3",
    title: "Risk Management",
    instructor: "Alice Johnson",
    status: "active",
    image: "/window.svg",
  },
];

export function LandingCourses() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-green-200 mb-8 text-center drop-shadow-lg">
        <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300 bg-clip-text text-transparent">
          Explore Our Courses
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gradient-to-br from-green-950 via-emerald-950 to-lime-900 rounded-2xl shadow-2xl p-0 border border-green-800 flex flex-col gap-0 hover:scale-[1.03] hover:shadow-emerald-900/40 transition-transform group"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-bold text-green-100 mb-1 drop-shadow">
                {course.title}
              </h3>
              <p className="text-sm text-green-300 mb-1">
                <span className="font-semibold text-emerald-300">
                  Instructor:
                </span>{" "}
                {course.instructor}
              </p>
              <span
                className={`inline-block rounded-full text-xs font-bold shadow min-w-0 px-2 py-0.5 ${
                  course.status === "active"
                    ? "bg-emerald-900 text-emerald-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
                style={{ width: "fit-content" }}
              >
                {course.status === "active" ? "Active" : "Inactive"}
              </span>
              <button
                className={`mt-4 px-4 py-2 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors shadow-lg ${
                  course.status === "active"
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : "bg-gray-700 text-gray-300 cursor-not-allowed"
                }`}
                disabled={course.status !== "active"}
              >
                {course.status === "active" ? "View Details" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
