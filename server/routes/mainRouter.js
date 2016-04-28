var express = require('express');
var mainRouter = express.Router();
//require controllers  require('./../controllers/ExampleController.js')

mainRouter.route('/')
  .get(function(req, res) {
    res.json({message: 'Hello World'});
  });

/*
mainRouter.route('/Example')
  .get(Examplecontroller);
*/


module.exports = mainRouter;