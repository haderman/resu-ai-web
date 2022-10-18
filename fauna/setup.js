const faunadb = require('faunadb');
const { createAuthCollectionsAndIndex } = require('./schemas/auth');

require('dotenv').config({ path: '.env.local'});

let client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  scheme: process.env.FAUNA_SCHEME,
  domain: process.env.FAUNA_DOMAIN,
  port: process.env.FAUNA_PORT,
});

async function main() {
  await createAuthCollectionsAndIndex(client);
}

main();
