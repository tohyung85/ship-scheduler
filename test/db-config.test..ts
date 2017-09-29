import Chai = require('chai');
import Lab = require('lab');
import * as DbConfig from '../db-config';

const lab = exports.lab = Lab.script();
lab.experiment('DbConfig', () => {
  const config = DbConfig.get('/');
  const meta = DbConfig.meta('/');

  lab.test('it gets db connection data', (done) => {
    const connection = config.connection;

    Chai.expect(connection).to.be.an('object');
    Chai.expect(connection.host).to.be.a('string');
    Chai.expect(connection.user).to.be.a('string');
    Chai.expect(connection.password).to.be.a('string');
    Chai.expect(connection.database).to.be.a('string');
    Chai.expect(connection.charset).to.be.a('string');

    done();
  });


  lab.test('it specifies a supported database', (done) => {
    const allowable = ['mysql', 'pg', 'sqlite3'];

    Chai.expect(config.client).to.be.a('string');
    Chai.expect(allowable).to.include(config.client);

    done();
  });

  lab.test('it specifies a migration table', (done) => {
    Chai.expect(config.migrations).to.be.an('object');
    Chai.expect(config.migrations.tableName).to.be.a('string');

    done();
  });

  lab.test('it specifies a seed folder', (done) => {
    Chai.expect(config.seeds).to.be.an('object');
    Chai.expect(config.seeds.tableName).to.be.a('string');

    done();
  });
  
  lab.test('it gets config meta data', (done) => {
    Chai.expect(meta).to.match(/This file configures the database/i);

    done();
  });
});
