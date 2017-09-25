import Chai = require('chai');
import Lab = require('lab');
// import Hello = require('../test');
import Manifest = require('../manifest');

const lab = exports.lab = Lab.script();


lab.experiment('Manifest', () => {

  lab.test('it gets manifest data', (done) => {

    Chai.expect(Manifest.get('/')).to.be.an('object');
    // Chai.expect(Hello.hello()).to.be.a('string');

    done();
  });


  lab.test('it gets manifest meta data', (done) => {

    Chai.expect(Manifest.meta('/')).to.match(/this file defines the plot device/i);

    done();
  });
});
