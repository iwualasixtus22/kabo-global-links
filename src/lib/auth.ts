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
  },
  secret: process.env.NEXTAUTH_SECRET,
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
          console.log('AUTH DEBUG: Attempting login for:', credentials.email.toLowerCase());
          const user = await db.user.findUnique({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          if (!user) {
            console.log('AUTH DEBUG: User not found');
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
          console.error('AUTH DEBUG: CRITICAL LOGIN ERROR:', error);
          // If it's one of our custom errors, re-throw it
          if (error.message === 'No account found with this email' || 
              error.message === 'Incorrect password' ||
              error.message === 'Account exists but no password is set') {
            throw error;
          }
          // Otherwise, it's a DB error
          throw new Error('Database connection error: ' + (error.message || 'Unknown error'));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
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
