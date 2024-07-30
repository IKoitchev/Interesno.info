import mongoose from 'mongoose';
import logger from './logger';

export default async function connect() {
  const dbHost = process.env.MONGO_DB_HOST || 'localhost';
  const dbPort = process.env.MONGO_DB_PORT || '27017';
  const dbUser = process.env.MONGO_DB_USER || 'root';
  const dbPass = process.env.MONGO_DB_PASSWORD || 'password';

  try {
    await mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/`);
    logger.info('Db connected');
  } catch (error) {
    logger.error('Could not connect to db');
    logger.info(error);
    process.exit(1);
  }
}
