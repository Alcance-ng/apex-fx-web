import { DefaultUser } from "next-auth";

// Extend the default session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      role: string;
      isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    isEmailVerified: boolean;
    accessToken: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    isEmailVerified: boolean;
    accessToken: string;
    refreshToken?: string;
  }
}
