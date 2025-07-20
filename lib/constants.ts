// App Configuration
export const APP_CONFIG = {
  name: "Apex FX",
  description: "Premium forex trading signals and education",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:4000/api",
  },
} as const;

// Route Constants
export const ROUTES = {
  // Public routes
  HOME: "/",
  LANDING: "/landing",

  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",

  // User routes
  USER_DASHBOARD: "/dashboard",
  USER_PROFILE: "/profile",
  USER_SUBSCRIPTIONS: "/subscriptions",
  USER_COURSES: "/courses",
  USER_TRANSACTIONS: "/transactions",
  USER_NOTIFICATIONS: "/notifications",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_COURSES: "/admin/courses",
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS: "/admin/analytics",

  // Super Admin routes
  SUPER_ADMIN_DASHBOARD: "/super-admin/dashboard",
  SUPER_ADMIN_ADMINS: "/super-admin/admins",
  SUPER_ADMIN_LOGS: "/super-admin/logs",
  SUPER_ADMIN_SETTINGS: "/super-admin/settings",
} as const;

// User Roles
export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

// Subscription Types
export const SUBSCRIPTION_TYPES = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
  PENDING: "PENDING",
} as const;

// Course Types
export const COURSE_TYPES = {
  VIDEO: "VIDEO",
  TEXT: "TEXT",
  PDF: "PDF",
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  SUBSCRIPTION: "SUBSCRIPTION",
  COURSE_PURCHASE: "COURSE_PURCHASE",
  REFUND: "REFUND",
} as const;

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "apex_fx_auth_token",
  REFRESH_TOKEN: "apex_fx_refresh_token",
  USER_PREFERENCES: "apex_fx_user_preferences",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_EMAIL: "/auth/verify-email",

  // User
  PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",

  // Subscriptions
  SUBSCRIPTIONS: "/subscriptions",
  SUBSCRIBE: "/subscriptions/subscribe",
  CANCEL_SUBSCRIPTION: "/subscriptions/cancel",

  // Courses
  COURSES: "/courses",
  COURSE_DETAILS: "/courses/:id",
  PURCHASE_COURSE: "/courses/:id/purchase",

  // Transactions
  TRANSACTIONS: "/transactions",

  // Notifications
  NOTIFICATIONS: "/notifications",
  MARK_READ: "/notifications/:id/read",

  // Admin
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS: "/admin/analytics",

  // Super Admin
  SYSTEM_LOGS: "/super-admin/logs",
  ADMIN_MANAGEMENT: "/super-admin/admins",
} as const;
