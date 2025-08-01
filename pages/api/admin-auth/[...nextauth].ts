import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const adminAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "AdminCredentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("[Admin NextAuth] Received credentials:", credentials);
          const payload = {
            email: credentials?.email,
            password: credentials?.password,
          };
          console.log("[Admin NextAuth] Payload sent to backend:", payload);
          const res = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/admin/login",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("[Admin NextAuth] Backend response:", res.data);
          const data = res.data;

          // Handle both possible response formats
          if (data?.success && data?.data) {
            // New format: { success: true, data: { user, token, refreshToken } }
            const { user, token, refreshToken } = data.data;

            // Only allow ADMIN and SUPER_ADMIN roles
            if (!["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
              console.error("Invalid role for admin login:", user.role);
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              isEmailVerified: user.isEmailVerified,
              accessToken: token,
              refreshToken: refreshToken,
            };
          } else if (data?.access_token && (data?.user || data?.admin)) {
            // Legacy format: { access_token, user } or { access_token, admin }
            const legacyUser = data.user || data.admin;
            // Only allow ADMIN and SUPER_ADMIN roles
            if (
              !legacyUser ||
              !["ADMIN", "SUPER_ADMIN"].includes(legacyUser.role)
            ) {
              console.error("Invalid role for admin login:", legacyUser?.role);
              return null;
            }
            return {
              id: legacyUser.id,
              email: legacyUser.email,
              name:
                legacyUser.name ||
                `${legacyUser.firstName || ""} ${
                  legacyUser.lastName || ""
                }`.trim(),
              firstName: legacyUser.firstName,
              lastName: legacyUser.lastName,
              role: legacyUser.role,
              isEmailVerified: legacyUser.isEmailVerified,
              accessToken: data.access_token,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "[Admin NextAuth] Axios error:",
              error.response?.data,
              error.message
            );
          } else {
            console.error("[Admin NextAuth] Unknown error:", error);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Store user data in token on sign in
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
      }

      // Handle session updates (e.g., profile updates)
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        role: token.role as string,
        isEmailVerified: token.isEmailVerified as boolean,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(adminAuthOptions);
