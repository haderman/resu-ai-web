const faunadb = require('faunadb');
const { createAuthCollectionsAndIndex } = require('./schemas/auth');

require('dotenv').config({ path: '.env.local'});
// var fs = require('fs');
// const envfile = require('envfile');
// const sourcePath = '.env.local';
// const sourcePathExample = '.env.local.example';

console.log('process.env.FAUNA_SECRET > ', process.env.FAUNA_SECRET);

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
