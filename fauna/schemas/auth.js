const q = require('faunadb').query;

async function createAuthCollectionsAndIndex(client) {
  await client.query(q.If(q.Exists(q.Collection('accounts')), true, createAccountsCollection));
  await client.query(q.If(q.Exists(q.Collection('sessions')), true, createSessionsCollection));
  await client.query(q.If(q.Exists(q.Collection('users')), true, createUsersCollection));
  await client.query(q.If(q.Exists(q.Collection('verification_tokens')), true, createVerificationTokensCollection));

  await client.query(
    q.If(
      q.Exists(
        q.Index('account_by_provider_and_provider_account_id')),
        true,
        createIndexAccountByProviderAndProviderAccountId
      )
    );
  await client.query(
    q.If(
      q.Exists(
        q.Index('session_by_session_token')),
        true,
        createIndexSessionBySessionToken
      )
    );
  await client.query(
    q.If(
      q.Exists(
        q.Index('user_by_email')),
        true,
        createIndexUserByEmail
      )
    );
  await client.query(
    q.If(
      q.Exists(
        q.Index('verification_token_by_identifier_and_token')),
        true,
        createIndexVerificationTokenByIdentifierAndToken
      )
    );
}

const createAccountsCollection = q.CreateCollection({ name: 'accounts' });
const createSessionsCollection = q.CreateCollection({ name: 'sessions' });
const createUsersCollection = q.CreateCollection({ name: 'users' });
const createVerificationTokensCollection = q.CreateCollection({ name: 'verification_tokens' });

const createIndexAccountByProviderAndProviderAccountId = q.CreateIndex({
  name: 'account_by_provider_and_provider_account_id',
  source: q.Collection('accounts'),
  unique: true,
  terms: [
    { field: ['data', 'provider'] },
    { field: ['data', 'providerAccountId'] }
  ]
});

const createIndexSessionBySessionToken = q.CreateIndex({
  name: 'session_by_session_token',
  source: q.Collection('sessions'),
  unique: true,
  terms: [{ field: ['data', 'sessionToken'] }]
});

const createIndexUserByEmail = q.CreateIndex({
  name: 'user_by_email',
  source: q.Collection('users'),
  unique: true,
  terms: [{ field: ['data', 'email'] }]
});

const createIndexVerificationTokenByIdentifierAndToken = q.CreateIndex({
  name: 'verification_token_by_identifier_and_token',
  source: q.Collection('verification_tokens'),
  unique: true,
  terms: [{ field: ['data', 'identifier'] }, { field: ['data', 'token'] }]
});

module.exports = { createAuthCollectionsAndIndex };
