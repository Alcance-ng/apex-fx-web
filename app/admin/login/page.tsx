"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAdminAuth, useAdminSignIn } from "@/hooks/useAdminNextAuth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { session, status, hasAdminAccess } = useAdminAuth();
  const adminSignIn = useAdminSignIn();
  const router = useRouter();

  // Redirect if already authenticated
  if (status === "authenticated" && session?.user && hasAdminAccess) {
    const role = session.user.role;
    if (role === "SUPER_ADMIN") {
      router.push("/admin/super-dash");
    } else if (role === "ADMIN") {
      router.push("/admin/dashboard");
    }
    return null;
  }

  const handleChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await adminSignIn({
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid admin credentials or insufficient permissions");
        return;
      }

      if (result?.ok) {
        // Give NextAuth time to update the session, then let middleware handle redirect
        window.location.reload();
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4"
      role="main"
      aria-labelledby="admin-login-title"
    >
      <Card className="w-full max-w-md bg-white/95 shadow-lg">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/admin"
              className="text-2xl font-bold text-lime-700 mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
              aria-label="Go to Apex FX admin homepage"
            >
              Apex FX Admin
            </Link>
            <h1
              id="admin-login-title"
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Admin Login
            </h1>
            <p className="text-base text-gray-700">
              Sign in to your admin account
            </p>
          </div>
          {/* Error Message */}
          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                role="alert"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Admin login form"
          >
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Email address
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="Enter your admin email"
                  className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                  aria-required="true"
                  aria-label="Admin email address"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Password
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="Enter your password"
                  className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                  aria-required="true"
                  aria-label="Admin password"
                />
              </label>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-lime-700 hover:bg-lime-800 focus-visible:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white text-white font-semibold py-3 rounded-lg transition-colors"
              aria-label="Sign in as admin"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <Link
              href="/admin/forgot-password"
              className="text-sm text-lime-400 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
              aria-label="Forgot admin password?"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
