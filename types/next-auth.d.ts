import { DefaultUser } from "next-auth";

// Extend the default session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    accessToken: string;
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    role: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
    accessToken: string;
  }
}
