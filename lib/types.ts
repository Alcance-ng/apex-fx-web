// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

// Authentication Types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
}

export type SubscriptionType = "WEEKLY" | "MONTHLY" | "YEARLY";
export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING";

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: CourseType;
  content: CourseContent[];
  createdAt: string;
  updatedAt: string;
}

export type CourseType = "VIDEO" | "TEXT" | "PDF";

export interface CourseContent {
  id: string;
  title: string;
  type: CourseType;
  url?: string;
  content?: string;
  order: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  createdAt: string;
}

export type TransactionType = "SUBSCRIPTION" | "COURSE_PURCHASE" | "REFUND";
export type TransactionStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Analytics Types (for admin)
export interface AnalyticsData {
  totalUsers: number;
  activeSubscriptions: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  topCourses: Course[];
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
}
