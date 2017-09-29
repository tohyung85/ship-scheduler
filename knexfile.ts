import * as DbConfig from './db-config';

const devConfig = DbConfig.get('/');

const {migrations, seeds, client, connection} = devConfig;

const environments = ['development', 'test', 'production'];
let configuration = {};
environments.forEach(env => {
  const {migrations, seeds, client, connection} = DbConfig.get('/', {env});
  configuration[env] = { migrations, seeds, client, connection };
})

module.exports = configuration; 