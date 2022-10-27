const q = require('faunadb').query;

module.exports = { createResumesCollectionAndIndexes };

const constants = {
  collection: 'resumes',
  indexes: {
    byUserId: 'resume_by_user_id',
    byId: 'resume_by_id',
  },
};

async function createResumesCollectionAndIndexes(client) {
  await createCollections(client);
  await createIndexes(client);
}

async function createCollections(client) {
  await client.query(
    q.If(
      q.Exists(
        q.Collection(constants.collection)),
        true,
        createResumesCollection
      )
    );
}

async function createIndexes(client) {
  await client.query(
    q.If(
      q.Exists(
        q.Index(constants.indexes.byUserId)),
        true,
        createIndexResumeByUserId
      )
    );

  await client.query(
    q.If(
      q.Exists(
        q.Index(constants.indexes.byId)),
        true,
        createIndexResumeById
      )
    );
}

const createResumesCollection = q.CreateCollection({ name: constants.collection });

const createIndexResumeByUserId = q.CreateIndex({
  name: constants.indexes.byUserId,
  source: q.Collection(constants.collection),
  unique: false,
  terms: [{ field: ['data', 'userId'] }],
});

const createIndexResumeById = q.CreateIndex({
  name: constants.indexes.byId,
  source: q.Collection(constants.collection),
  unique: true,
  terms: [{ field: ['data', 'id'] }],
});
