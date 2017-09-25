import Confidence = require('confidence');
import Dotenv = require('dotenv');

Dotenv.config({silent: true});

const criteria = {
  env: process.env.NODE_ENV
};


const config = {
  $meta: 'This file configures the plot device.',
  projectName: 'Hapi Starter',
  port: {
    web: {
      $filter: 'env',
      test: 9090,
      production: process.env.PORT,
      development: 8080,
      $default: 8080
    }
  },
};


const store = new Confidence.Store(config);


export function get(key: string) {
  return store.get(key, criteria);
};


export function meta(key: string) {
  return store.meta(key, criteria);
};
