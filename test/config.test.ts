import Chai = require('chai');
import Lab = require('lab');
import * as Config from '../config';
// import Config = require('../config');

const lab = exports.lab = Lab.script();


lab.experiment('Config', () => {

  lab.test('it gets config data', (done) => {

    Chai.expect(Config.get('/')).to.be.an('object');

    done();
  });


  lab.test('it gets config meta data', (done) => {

    Chai.expect(Config.meta('/')).to.match(/this file configures the plot device/i);

    done();
  });
});
