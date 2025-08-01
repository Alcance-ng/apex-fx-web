"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");
    try {
      // TODO: Replace with actual API call
      console.log("Admin registration attempt:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // TODO: Redirect to admin verify email page
      window.location.href = `/admin/verify-email?email=${encodeURIComponent(
        formData.email
      )}`;
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Register | Apex FX</title>
        <meta
          name="description"
          content="Create your Apex FX admin account to access the admin dashboard and manage the platform."
        />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4"
        role="main"
        aria-labelledby="admin-register-title"
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
                id="admin-register-title"
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Create admin account
              </h1>
              <p className="text-gray-700">Register to manage Apex FX</p>
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
            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-label="Admin registration form"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    First name
                    <Input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="First name"
                      className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                      aria-required="true"
                      aria-label="First name"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Last name
                    <Input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Last name"
                      className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                      aria-required="true"
                      aria-label="Last name"
                    />
                  </label>
                </div>
              </div>
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
                    placeholder="Create a password"
                    className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                    aria-required="true"
                    aria-label="Admin password"
                  />
                </label>
                <p className="mt-1 text-base text-gray-600">
                  Must be at least 8 characters long
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Confirm password
                  <Input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    placeholder="Confirm your password"
                    className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                    aria-required="true"
                    aria-label="Confirm password"
                  />
                </label>
              </div>
              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-lime-700 focus:ring-lime-500 border-gray-300 rounded"
                    aria-required="true"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-800">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-lime-700 hover:text-lime-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-lime-700 hover:text-lime-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-lime-700 hover:bg-lime-800 focus-visible:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white text-white font-semibold py-3 rounded-lg transition-colors"
                aria-label="Create admin account"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-base text-gray-700">
                Already have an admin account?{" "}
                <Link
                  href="/admin/login"
                  className="font-medium text-lime-700 hover:text-lime-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                  aria-label="Sign in as admin"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
