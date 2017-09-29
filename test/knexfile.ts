import Chai = require('chai');
import Lab = require('lab');
import Knexfile = require('../knexfile');

const lab = exports.lab = Lab.script();

const knexfileKeys = ['development', 'test', 'production'];
const environmentKeys = ['migrations', 'seeds', 'client', 'connection'];

lab.experiment('Knexfile config', () => {
  lab.test('it has environment configurations', (done) => {
    Chai.expect(Knexfile).to.have.all.keys(knexfileKeys);

    done();
  });

  lab.test('it has a complete configurations', (done) => {
    const developmentConf = Knexfile['development'];
    const testConf = Knexfile['test'];
    const productionConf = Knexfile['production'];

    Chai.expect(developmentConf).to.have.all.keys(environmentKeys);
    Chai.expect(testConf).to.have.all.keys(environmentKeys);
    Chai.expect(productionConf).to.have.all.keys(environmentKeys);

    done();
  });
});
