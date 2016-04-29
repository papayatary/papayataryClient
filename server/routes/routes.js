var express = require('express');
var path = require('path');
// custom helper middleware 
var helpers = require('../config/helpers.js');

module.exports =  (app, express) => {
  
  // app.get('/example', examplecontroller);
  app.get('/', controller.example);

  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', controller.callback);

  // Initial page redirecting to Github
  app.get('/auth', controller.auth);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

