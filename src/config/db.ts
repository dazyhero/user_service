import { ConnectionOptions } from 'mongoose';

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

export const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
