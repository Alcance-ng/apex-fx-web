import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const data = res.data;

          // Handle both possible response formats
          if (data?.success && data?.data) {
            // New format: { success: true, data: { user, token, refreshToken } }
            const { user, token, refreshToken } = data.data;
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
          } else if (data?.access_token && data?.user) {
            // Legacy format: { access_token, user }
            return {
              id: data.user.id,
              email: data.user.email,
              name:
                data.user.name ||
                `${data.user.firstName} ${data.user.lastName}`,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              role: data.user.role,
              isEmailVerified: data.user.isEmailVerified,
              accessToken: data.access_token,
            };
          }
          return null;
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day to match backend token expiry
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
    signIn: "/login",
    error: "/login", // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
