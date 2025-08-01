"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already authenticated
  if (status === "authenticated" && session?.user) {
    const role = session.user.role;
    if (role === "SUPER_ADMIN") {
      router.push("/super-admin/dashboard");
    } else if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
    return null;
  }

  const handleChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      if (result?.ok) {
        // Give NextAuth time to update the session
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Apex FX</title>
        <meta
          name="description"
          content="Login to your Apex FX account to access trading signals, analysis, and more."
        />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4"
        role="main"
        aria-labelledby="login-title"
      >
        <Card className="w-full max-w-md bg-white/95 shadow-lg">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="text-2xl font-bold text-lime-700 mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                aria-label="Go to Apex FX homepage"
              >
                Apex FX
              </Link>
              <h1
                id="login-title"
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Welcome back
              </h1>
              <p className="text-base text-gray-700">
                Sign in to your account to continue
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
              aria-label="Login form"
            >
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email address
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder="Enter your email"
                    className="w-full mt-1 text-gray-900 bg-white border border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                    aria-required="true"
                    aria-label="Email address"
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
                    aria-label="Password"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-lime-400 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
                  aria-label="Forgot password?"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-700 hover:bg-lime-800 focus-visible:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white text-white font-semibold py-3 rounded-lg transition-colors"
                aria-label="Sign in"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-emerald-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-emerald-900 text-emerald-200">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full border-emerald-700 text-emerald-200 hover:bg-lime-900/30 focus-visible:ring-lime-400"
                  onClick={() => alert("Google login not implemented yet")}
                  aria-label="Sign in with Google"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-emerald-700 text-emerald-200 hover:bg-lime-900/30 focus-visible:ring-lime-400"
                  onClick={() => alert("Apple login not implemented yet")}
                  aria-label="Sign in with Apple"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-base text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-lime-700 hover:text-lime-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                  aria-label="Sign up for free"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
