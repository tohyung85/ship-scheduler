import Dotenv = require('dotenv');
import Confidence = require('confidence');

export type Criteria = {
  env: string | undefined
};

Dotenv.config({silent: true});

const criteria: Criteria = {
  env: process.env.NODE_ENV
};


const config = {
  $meta: 'This file configures the database',
  migrations: { tableName: 'knex_migrations' },
  seeds: { tableName: './seeds' },

  client: 'mysql',
  connection: {
    host: {
      $filter: 'env',
      test: process.env.DB_HOST_TEST,
      production: process.env.DB_HOST_DEV,
      development: process.env.DB_HOST_DEV,
      $default: process.env.DB_HOST_DEV
    },

    user: {
      $filter: 'env',
      test: process.env.DB_USER_TEST,
      production: process.env.DB_USER_DEV,
      development: process.env.DB_USER_DEV,
      $default: process.env.DB_USER_DEV
    },

    password: {
      $filter: 'env',
      test: process.env.DB_PASSWORD_TEST,
      development: process.env.DB_PASSWORD_DEV,
      production: process.env.DB_PASSWORD_DEV,
      $default: process.env.DB_PASSWORD_DEV
    },

    database: {
      $filter: 'env',
      test: process.env.DB_NAME_TEST,
      development: process.env.DB_NAME_DEV,
      production: process.env.DB_NAME_DEV,
      $default: process.env.DB_NAME_DEV
    },
    charset: 'utf8'
  }
};


const store = new Confidence.Store(config);


export function get(key: string, env: Criteria = criteria) {
  return store.get(key, env);
};


export function meta(key: string, env: Criteria = criteria) {
  return store.meta(key, env);
};