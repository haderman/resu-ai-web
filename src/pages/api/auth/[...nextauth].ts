import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { faunaAdapter } from '@/server/adapters';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  theme: {
    colorScheme: 'dark',
  },
  adapter: faunaAdapter,
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = user.id;
      return session;
    }
  },
};
export default NextAuth(authOptions);
