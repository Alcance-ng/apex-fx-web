import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Determine which auth system to use based on the route
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verify-email") ||
    pathname === "/unauthorized" ||
    pathname === "/admin/login";

  const isPublicPage =
    pathname === "/" || pathname.startsWith("/landing") || isAuthPage;

  // Allow public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Get token from appropriate auth system
  let token;

  if (isAdminRoute) {
    // For admin routes, try to get token from admin auth first
    try {
      token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
        // Try with custom cookie name for admin auth
        cookieName:
          process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
        // Check if this request came through admin auth
      });

      // Validate that the token has admin role
      if (token && !["ADMIN", "SUPER_ADMIN"].includes(token.role as string)) {
        token = null;
      }
    } catch (error) {
      console.error("Failed to get admin token:", error);
      token = null;
    }
  } else {
    // For user routes, get token from regular auth
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
  }

  const isAuth = !!token;

  // Protected routes - require authentication
  const isProtectedRoute =
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");

  if (isProtectedRoute && !isAuth) {
    // Redirect to appropriate login page
    if (isAdminRoute && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    } else if (!isAdminRoute && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // If already on login page, allow
    return NextResponse.next();
  }

  // Role-based access control for authenticated users
  if (isAuth && token?.role) {
    const role = token.role as string;

    // Super admin specific routes
    if (pathname.startsWith("/admin/super-dash") && role !== "SUPER_ADMIN") {
      if (!pathname.includes("/unauthorized")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // Admin dashboard (only for ADMIN role, not SUPER_ADMIN)
    if (pathname === "/admin/dashboard" && role !== "ADMIN") {
      if (!pathname.includes("/unauthorized")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // Other admin routes (accessible by ADMIN and SUPER_ADMIN)
    if (
      pathname.startsWith("/admin") &&
      !pathname.startsWith("/admin/super-dash") &&
      pathname !== "/admin/dashboard" &&
      !["ADMIN", "SUPER_ADMIN"].includes(role)
    ) {
      if (!pathname.includes("/unauthorized")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // User routes - block admins and super admins
    if (
      (pathname.startsWith("/user") ||
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/profile")) &&
      ["ADMIN", "SUPER_ADMIN"].includes(role)
    ) {
      if (!pathname.includes("/unauthorized")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }
    // User routes - accessible by regular users
    if (
      pathname.startsWith("/user") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile")
    ) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
