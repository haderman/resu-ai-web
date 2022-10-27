const faunadb = require('faunadb');
require('dotenv').config({ path: '.env.local'});

const { createAuthCollectionsAndIndex } = require('./schemas/auth');
const { createResumesCollectionAndIndexes } = require('./schemas/resume');


let client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  scheme: process.env.FAUNA_SCHEME,
  domain: process.env.FAUNA_DOMAIN,
  port: process.env.FAUNA_PORT,
});

async function main() {
  await createAuthCollectionsAndIndex(client);
  await createResumesCollectionAndIndexes(client);
}

main();
