import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect back to login on error instead of generic error page
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only',
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log('AUTH DEBUG: Checking database connection...');
          // Test connection
          await db.$queryRaw`SELECT 1`;
          
          console.log('AUTH DEBUG: Attempting login for:', credentials.email.toLowerCase());
          const user = await db.user.findUnique({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          if (!user) {
            console.log('AUTH DEBUG: User not found in database');
            throw new Error('No account found with this email');
          }

          if (!user.password) {
            console.log('AUTH DEBUG: User has no password set');
            throw new Error('Account exists but no password is set');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            console.log('AUTH DEBUG: Password mismatch');
            throw new Error('Incorrect password');
          }

          console.log('AUTH DEBUG: Login successful for:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          console.error('AUTH DEBUG: CRITICAL LOGIN ERROR:', error.message);
          
          // Re-throw known errors
          const knownErrors = ['No account found with this email', 'Incorrect password', 'Account exists but no password is set'];
          if (knownErrors.includes(error.message)) {
            throw error;
          }
          
          // If it's a Prisma error, give more context
          if (error.code) {
            throw new Error(`Database Error (${error.code}): Please check your Vercel DATABASE_URL`);
          }

          throw new Error('Authentication Service Unavailable: ' + (error.message || 'Unknown error'));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'USER';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
