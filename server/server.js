var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mainRouter = require('./routes/mainRouter.js');
//define process variables
var port = process.env.PORT || 8000;
//configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
//routing
app.use(mainRouter);

app.listen(port, function(err){
  if(err) {
    return console.log('error listening on port'+port, err);
  }
  console.log('App is listening on port '+port);
});