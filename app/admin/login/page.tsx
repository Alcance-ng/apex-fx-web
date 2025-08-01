"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      // TODO: Replace with actual admin API call
      console.log("Admin login attempt:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Admin login successful! (This will redirect to admin dashboard)");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Apex FX</title>
        <meta
          name="description"
          content="Admin login for Apex FX. Access the admin dashboard and manage the platform."
        />
      </Head>
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
    </>
  );
}
