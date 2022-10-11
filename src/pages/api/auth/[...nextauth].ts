import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

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
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
};
export default NextAuth(authOptions);
