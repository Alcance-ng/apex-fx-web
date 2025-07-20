import { APP_CONFIG } from "./constants";
import type { ApiResponse } from "./types";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = APP_CONFIG.api.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("apex_fx_auth_token");
    }
    return null;
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
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
      body: JSON.stringify(userData),
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
      body: JSON.stringify(data),
    });
  }

  // Subscription methods
  async getSubscriptions() {
    return this.request("/subscriptions");
  }

  async subscribe(subscriptionData: Record<string, unknown>) {
    return this.request("/subscriptions/subscribe", {
      method: "POST",
      body: JSON.stringify(subscriptionData),
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
}

export const apiClient = new ApiClient();
