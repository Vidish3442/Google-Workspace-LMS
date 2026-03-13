import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDatabase() {
  if (!config.mongoUri) {
    throw new Error('Missing MONGODB_URI in server/.env');
  }

  await mongoose.connect(config.mongoUri, {
    dbName: config.mongoDbName
  });

  return mongoose.connection;
}
