var express = require('express');
var path = require('path');
// custom helper middleware 
var helpers = require('../config/helpers.js');
var controller = require('../api/controller.js');
var apiController = require('../api/apiController.js');

module.exports =  (app, express) => {
  // Initial page redirecting to FitBit
  app.get('/auth', controller.auth);
  
  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', controller.callback);


  // app.get('/auth', apiController.auth);
  // app.get('/callback', apiController.callback);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

