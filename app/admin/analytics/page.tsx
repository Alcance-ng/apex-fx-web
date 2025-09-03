"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth, useAdminSignOut } from "@/hooks/useAdminNextAuth";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAdminTransactions } from "@/hooks/useAdminTransactions";
import { useAdminPlans } from "@/hooks/useAdminPlans";
import { useAdminCourses } from "@/hooks/useAdminCourses";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { AdminDashboardHeader } from "@/components/admin/AdminDashboardHeader";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import React from "react";

// Utility helpers -----------------------------------------------------------
interface TimePoint {
  date: string; // YYYY-MM-DD
  value: number;
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getLastNDates(n: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(formatDateKey(d));
  }
  return out;
}

function groupCountByDay<T extends { createdAt: string }>(items: T[], days: number): TimePoint[] {
  const map = new Map<string, number>();
  items.forEach((i) => {
    const d = formatDateKey(new Date(i.createdAt));
    map.set(d, (map.get(d) || 0) + 1);
  });
  return getLastNDates(days).map((d) => ({ date: d, value: map.get(d) || 0 }));
}

function groupSumByDay<T extends { createdAt: string }>(items: T[], field: keyof T, days: number): TimePoint[] {
  const map = new Map<string, number>();
  items.forEach((i) => {
    const d = formatDateKey(new Date(i.createdAt));
    const raw = (i as any)[field];
    const val = typeof raw === "number" ? raw : 0;
    map.set(d, (map.get(d) || 0) + val);
  });
  return getLastNDates(days).map((d) => ({ date: d, value: map.get(d) || 0 }));
}

// Simple reusable card ------------------------------------------------------
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string; // tailwind text color for icon
}

function MetricCard({ icon, label, value, sub, color }: MetricCardProps) {
  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-lg shadow-lg p-5 border border-purple-900 flex flex-col justify-between">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg bg-purple-900/50 ${color || ""}`}>{icon}</div>
        <div className="ml-3">
          <p className="text-xs uppercase tracking-wide text-purple-300 font-medium">{label}</p>
          <p className="text-xl font-semibold text-white mt-0.5">{value}</p>
        </div>
      </div>
      {sub && <p className="text-[11px] text-purple-300/70 mt-auto">{sub}</p>}
    </div>
  );
}

// Tiny Bar Chart ------------------------------------------------------------
interface BarChartProps {
  data: TimePoint[];
  title: string;
  color?: string; // bar color
  height?: number;
  valuePrefix?: string;
  valueFormat?: (v: number) => string;
}

function BarChart({ data, title, color = "#a855f7", height = 140, valuePrefix = "", valueFormat }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / data.length;
  return (
    <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
      <h3 className="text-sm font-semibold text-purple-200 mb-3">{title}</h3>
      <div className="relative" style={{ height }}>
        <svg role="img" aria-label={title} className="w-full h-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
          {data.map((d, i) => {
            const h = (d.value / max) * (height - 20);
            return (
              <g key={d.date}>
                <rect
                  x={i * barWidth + 2}
                  y={height - h - 15}
                  width={barWidth - 4}
                  height={h}
                  rx={1.5}
                  fill={color}
                  className="transition-opacity hover:opacity-80"
                />
                <text
                  x={i * barWidth + barWidth / 2}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize={3.2}
                  fill="#c4b5fd"
                >
                  {d.date.slice(5)}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute top-2 right-2 text-[10px] text-purple-300">Max: {valuePrefix}{valueFormat ? valueFormat(max) : max}</div>
      </div>
    </div>
  );
}

// Tiny Line Chart -----------------------------------------------------------
interface LineChartProps {
  data: TimePoint[];
  title: string;
  stroke?: string;
  height?: number;
}

function LineChart({ data, title, stroke = "#34d399", height = 140 }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 100;
  const stepX = width / (data.length - 1 || 1);
  const points = data
    .map((d, i) => {
      const y = height - 20 - (d.value / max) * (height - 30);
      const x = i * stepX;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
      <h3 className="text-sm font-semibold text-purple-200 mb-3">{title}</h3>
      <div className="relative" style={{ height }}>
        <svg role="img" aria-label={title} className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            points={points}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {data.map((d, i) => {
            const y = height - 20 - (d.value / max) * (height - 30);
            const x = i * stepX;
            return (
              <g key={d.date}>
                <circle cx={x} cy={y} r={1.6} fill={stroke} />
              </g>
            );
          })}
          {data.map((d, i) => (
            <text
              key={d.date + "_lbl"}
              x={i * stepX}
              y={height - 5}
              textAnchor="middle"
              fontSize={3.2}
              fill="#c4b5fd"
            >
              {d.date.slice(5)}
            </text>
          ))}
        </svg>
        <div className="absolute top-2 right-2 text-[10px] text-purple-300">Max: {max}</div>
      </div>
    </div>
  );
}

// Donut Chart ---------------------------------------------------------------
interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  title: string;
}

function DonutChart({ data, title }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;
  return (
    <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
      <h3 className="text-sm font-semibold text-purple-200 mb-3">{title}</h3>
      <div className="flex items-center gap-4">
        <svg
          role="img"
          aria-label={title}
          width={160}
          height={160}
          viewBox="0 0 160 160"
          className="shrink-0"
        >
          <g transform="translate(80,80)">
            {data.map((slice) => {
              const fraction = slice.value / total;
              const dash = fraction * circumference;
              const circle = (
                <circle
                  key={slice.label}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={14}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offsetAcc}
                  className="transition-opacity hover:opacity-80"
                />
              );
              offsetAcc += dash;
              return circle;
            })}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              className="fill-purple-200"
            >
              {Math.round(total)}
            </text>
          </g>
        </svg>
        <ul className="flex-1 space-y-2">
          {data.map((s) => {
            const pct = ((s.value / total) * 100).toFixed(1);
            return (
              <li key={s.label} className="flex items-center text-xs text-purple-200">
                <span
                  className="inline-block w-3 h-3 rounded-sm mr-2"
                  style={{ background: s.color }}
                />
                <span className="flex-1 truncate">{s.label}</span>
                <span className="ml-2 text-purple-300/70">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// Page ----------------------------------------------------------------------
export default function AdminAnalyticsPage() {
  const { session, status, isAdmin } = useAdminAuth();
  const adminSignOut = useAdminSignOut();
  const router = useRouter();

  const token = session?.accessToken;
  const { users, analytics: userAnalytics, isLoading: usersLoading, error: usersError } = useAdminUsers(token);
  const { transactions, totalAmount, isLoading: txLoading, error: txError } = useAdminTransactions(token);
  const { plans, totalActiveSubscriptions, isLoading: plansLoading, error: plansError } = useAdminPlans(token);
  const { courses, isLoading: coursesLoading, error: coursesError } = useAdminCourses(token);

  const isLoading =
    status === "loading" || usersLoading || txLoading || plansLoading || coursesLoading;
  const error = usersError || txError || plansError || coursesError;

  const handleLogout = async () => {
    await adminSignOut();
    router.push("/admin/login");
  };

  React.useEffect(() => {
    if (status === "unauthenticated" || (!session && status !== "loading")) {
      router.push("/admin/login");
    }
  }, [status, session, router]);

  if (isLoading) return <AdminLoadingSpinner text="Loading analytics..." />;
  if (!session || !isAdmin) return null;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading analytics</h2>
            {/* @ts-expect-error optional chaining for message */}
          <p className="mb-4">{error?.message || "Unknown error"}</p>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Derived analytics -------------------------------------------------------
  const last7UserCounts = groupCountByDay(users, 7);
  const last7Revenue = groupSumByDay(transactions, "amount", 7);

  const avgTransaction = transactions.length
    ? totalAmount / transactions.length
    : 0;
  const totalEnrollments = courses.reduce((s, c) => s + (c.enrollCount || 0), 0);
  const avgCoursePrice = courses.length
    ? courses.reduce((s, c) => s + c.amount * (1 - c.discount / 100), 0) / courses.length
    : 0;
  const subscriptionPenetration = userAnalytics.totalUsers
    ? (totalActiveSubscriptions / userAnalytics.totalUsers) * 100
    : 0;

  // Top courses donut (limit to 5) -----------------------------------------
  const topCourses = [...courses]
    .sort((a, b) => b.enrollCount - a.enrollCount)
    .slice(0, 5);
  const donutData = topCourses.map((c, i) => {
    const palette = ["#a855f7", "#6366f1", "#f59e0b", "#10b981", "#ec4899"]; // purple, indigo, amber, emerald, pink
    return { label: c.name, value: c.enrollCount || 0, color: palette[i % palette.length] };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      <AdminDashboardHeader user={session.user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics & Insights</h1>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<UserGroupIcon className="h-5 w-5 text-blue-300" />}
            label="Total Users"
            value={userAnalytics.totalUsers}
            sub={`+${userAnalytics.newUsers.thisMonth} this month`}
          />
          <MetricCard
            icon={<CurrencyDollarIcon className="h-5 w-5 text-green-300" />}
            label="Total Revenue"
            value={`₦${totalAmount.toLocaleString()}`}
            sub={`Avg Tx: ₦${Math.round(avgTransaction).toLocaleString()}`}
          />
          <MetricCard
            icon={<AcademicCapIcon className="h-5 w-5 text-orange-300" />}
            label="Enrollments"
            value={totalEnrollments}
            sub={`Avg Course Price: ₦${Math.round(avgCoursePrice).toLocaleString()}`}
          />
            <MetricCard
            icon={<ChartBarIcon className="h-5 w-5 text-purple-300" />}
            label="Subscription %"
            value={`${subscriptionPenetration.toFixed(1)}%`}
            sub={`${totalActiveSubscriptions} active subs`}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <BarChart
              title="Revenue (Last 7 Days)"
              data={last7Revenue}
              valuePrefix="₦"
              valueFormat={(v) => v.toLocaleString()}
              color="#8b5cf6"
            />
            <LineChart title="New Users (Last 7 Days)" data={last7UserCounts} />
          </div>
          <div>
            {donutData.length ? (
              <DonutChart title="Top Course Enrollments" data={donutData} />
            ) : (
              <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900 flex items-center justify-center h-full text-sm text-purple-200">
                No course enrollment data yet
              </div>
            )}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
            <h3 className="text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-purple-300" /> User Growth Snapshot
            </h3>
            <ul className="text-xs space-y-2 text-purple-200/90">
              <li>Today: +{userAnalytics.newUsers.today}</li>
              <li>This Week: +{userAnalytics.newUsers.thisWeek}</li>
              <li>This Month: +{userAnalytics.newUsers.thisMonth}</li>
              <li>Active (7d): {userAnalytics.activeUsersLast7Days}</li>
            </ul>
          </div>
          <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
            <h3 className="text-sm font-semibold text-purple-200 mb-3">Transactions Overview</h3>
            <p className="text-xs text-purple-200/80 mb-2">Total Transactions: {transactions.length}</p>
            <p className="text-xs text-purple-200/80 mb-2">Average Value: ₦{Math.round(avgTransaction).toLocaleString()}</p>
            <p className="text-xs text-purple-200/80 mb-2">Highest Value: ₦{Math.max(...transactions.map(t => t.amount), 0).toLocaleString()}</p>
            <p className="text-xs text-purple-200/80">Revenue Last 7d: ₦{last7Revenue.reduce((s,d)=> s + d.value,0).toLocaleString()}</p>
          </div>
          <div className="bg-[#2d1847]/70 backdrop-blur-md rounded-lg p-5 border border-purple-900">
            <h3 className="text-sm font-semibold text-purple-200 mb-3">Courses Snapshot</h3>
            <p className="text-xs text-purple-200/80 mb-2">Total Courses: {courses.length}</p>
            <p className="text-xs text-purple-200/80 mb-2">Total Enrollments: {totalEnrollments}</p>
            <p className="text-xs text-purple-200/80 mb-2">Avg Price (net): ₦{Math.round(avgCoursePrice).toLocaleString()}</p>
            <p className="text-xs text-purple-200/80">Top Course: {topCourses[0]?.name || "—"}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
