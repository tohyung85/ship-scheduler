const {expect} = require('chai');
const Lab = require('lab');
const Manifest = require('../config');

const lab = exports.lab = Lab.script();


lab.experiment('Config', () => {

  lab.test('it gets config data', (done) => {

    expect(Manifest.get('/')).to.be.an('object');

    done();
  });


  lab.test('it gets config meta data', (done) => {

    expect(Manifest.meta('/')).to.match(/this file configures the plot device/i);

    done();
  });
});
