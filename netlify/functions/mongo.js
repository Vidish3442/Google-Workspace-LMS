const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || 'lmsdb';

let client;
let clientPromise;

async function getClient() {
  if (!uri) {
    throw new Error('Missing MONGO_URI environment variable.');
  }

  if (client) return client;
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri, {
      maxPoolSize: 5
    });
  }

  client = await clientPromise;
  return client;
}

exports.handler = async function handler() {
  try {
    const mongoClient = await getClient();
    const db = mongoClient.db(dbName);
    const users = db.collection('users');

    const data = await users
      .find({}, { projection: { name: 1, email: 1, _id: 0 } })
      .limit(25)
      .toArray();

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ok: true, count: data.length, data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ok: false, message: error.message })
    };
  }
};
