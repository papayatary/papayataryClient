var express = require('express');
// custom helper middleware
var helpers = require('../config/helpers.js');

module.exports = function (app, express) {
  // app.get('/', function(err, res){
  //   res.json('Hello World');
  // });
  //app.get('/example', examplecontroller);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

