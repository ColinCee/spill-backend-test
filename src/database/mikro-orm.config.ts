import { Options } from '@mikro-orm/core';

const config: Options = {
  // Ideally some of these properties should be in env vars
  // but since this is a test running locally we hardcode it
  type: 'postgresql',
  dbName: 'postgres',
  user: 'postgres',
  password: 'password',
  // For localhost development
  // host: 'localhost',
  // For docker-compose development
  host: 'database',
  entities: ['./build/src/database/entities'],
  entitiesTs: ['./src/database/entities'],
};

export default config;
