import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import jwt from 'jsonwebtoken';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { mongoClientPromise } from '@/lib/mongodb';
import { refreshAccessToken } from '@/lib/refreshToken';
import appConfig from '@/utils/appConfig';

const { googleClientId, googleClientSecret } = appConfig;

const GOOGLE_AUTHORIZATION_URL =
  // eslint-disable-next-line prefer-template
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar',
  });

export const nextAuthOptions = {
  adapter: MongoDBAdapter(mongoClientPromise),
  providers: [
    GoogleProvider({
      clientId: googleClientId as string,
      clientSecret: googleClientSecret as string,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NEXTAUTH_DEBUG === 'true',
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user: {
            ...user,
            refreshToken: account.refresh_token,
          },
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.id = token.user?.id;
      session.user = token.user;
      session.token = jwt.sign({ id: token.user.id, refreshToken: token.refreshToken }, appConfig.jwtSecretKey, {
        expiresIn: '24h',
      });
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
} as NextAuthOptions;

export default NextAuth(nextAuthOptions);
