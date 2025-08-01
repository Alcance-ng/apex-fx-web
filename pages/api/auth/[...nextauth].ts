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
          if (data?.access_token && data?.user) {
            return {
              ...data.user,
              accessToken: data.access_token,
            };
          }
          return null;
        } catch {
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
    async jwt({ token, user }) {
      if (user) {
        // Type guard for custom User type
        if ("id" in user && "role" in user && "accessToken" in user) {
          token.accessToken = user.accessToken;
          token.id = user.id;
          token.email = user.email;
          token.role = user.role;
        }
        // Assign name if present (AdapterUser)
        if ("name" in user) {
          token.name = user.name;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      session.accessToken = token.accessToken;
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
