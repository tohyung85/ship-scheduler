const Confidence = require('confidence');
const Dotenv = require('dotenv');

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


exports.get = (key) => {
  return store.get(key, criteria);
};


exports.meta = (key) => {
  return store.meta(key, criteria);
};
