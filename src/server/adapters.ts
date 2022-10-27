import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';

export const faunaClient = new FaunaClient({
  // @ts-ignore
  secret: process.env.FAUNA_SECRET,
  // @ts-ignore
  scheme: process.env.FAUNA_SCHEME,
  domain: process.env.FAUNA_DOMAIN,
  // @ts-ignore
  port: process.env.FAUNA_PORT,
});

export const faunaAdapter = FaunaAdapter(faunaClient);
