import Chai = require('chai');
import Composer = require('../index');
import Lab = require('lab');


const lab = exports.lab = Lab.script();


lab.experiment('App', () => {

    lab.test('it composes a server', (done) => {

        Composer((err, composedServer) => {

            Chai.expect(composedServer).to.be.an('object');

            done(err);
        });
    });
});
