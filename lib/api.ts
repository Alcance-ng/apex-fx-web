import { APP_CONFIG } from "./constants";
import type { ApiResponse, RegisterRequest } from "./types";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = APP_CONFIG.api.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...Object.fromEntries(
        Object.entries(options.headers ?? {}).filter(
          ([, v]) => typeof v === "string"
        )
      ),
    };

    try {
      const response = await axios<ApiResponse<T>>({
        url,
        headers,
        ...options,
      });
      return response.data as ApiResponse<T>;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const session = await getSession();
      return session?.accessToken || null;
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return null;
    }
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      data: credentials,
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request("/auth/register", {
      method: "POST",
      data: userData,
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  // User methods
  async getProfile() {
    return this.request("/user/profile");
  }

  async updateProfile(data: Record<string, unknown>) {
    return this.request("/user/profile", {
      method: "PUT",
      data,
    });
  }

  // Subscription methods
  async getSubscriptions() {
    return this.request("/subscriptions");
  }

  async subscribe(subscriptionData: Record<string, unknown>) {
    return this.request("/subscriptions/subscribe", {
      method: "POST",
      data: subscriptionData,
    });
  }

  // Course methods
  async getCourses() {
    return this.request("/courses");
  }

  async getCourse(id: string) {
    return this.request(`/courses/${id}`);
  }

  async purchaseCourse(id: string) {
    return this.request(`/courses/${id}/purchase`, {
      method: "POST",
    });
  }

  // Transaction methods
  async getTransactions() {
    return this.request("/transactions");
  }

  // Notification methods
  async getNotifications() {
    return this.request("/notifications");
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: "PUT",
    });
  }

  async registerUser(data: RegisterRequest) {
    return this.request("/users", {
      method: "POST",
      data,
    });
  }

  async verifyEmail(data: { email: string; code: string }) {
    return this.request("/users/verify-email", {
      method: "POST",
      data,
    });
  }
}

export const apiClient = new ApiClient();
