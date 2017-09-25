import Glue = require('glue');
import Manifest = require('./manifest');

const composeOptions = {
  relativeTo: __dirname
};


export = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);
