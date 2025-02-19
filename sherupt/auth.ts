import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // Check if user exists and password is correct
        if (user && user.password) {

          console.log('Password from form:', credentials.password);
          console.log('Password in DB:', user.password);

          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // If password is correct, return user object
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user doesn't exist or password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, trigger, user }: any) {
      console.log('Session (Before):', session);
      console.log('Token:', token);
      console.log('User (Expected Undefined):', user);
  
      // Use the token object to populate the session user properties
      session.user.id = token.sub; // Set the user ID from the token
      session.user.name = token.name; // Set the name from the token
      session.user.email = token.email; // Set the email from the token
  
      // If trigger is 'update', and user exists, allow updates to the session (optional)
      if (trigger === 'update' && user) {
        session.user.name = user.name;
      }
  
      console.log('Session (After):', session);
      return session;
    },
  },
  
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut  } = NextAuth(config);