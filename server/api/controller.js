var request = require('request');
var secret = require('keys');  // client api key

var clientId = '227LSD'; // Your client id
var redirectUri = 'http://localhost:8000/callback'; // Your redirect uri
var authUri = 'https://www.fitbit.com/oauth2/authorize';
var tokenRefreshUri = 'https://api.fitbit.com/oauth2/token';

var oauth2 = require('simple-oauth2')({
  clientID: clientId,
  clientSecret: secret,
  site: 'https://www.fitbit.com',
  tokenPath: '/oauth2/token',
  authorizationPath: 'oauth2/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:8000/callback',
  scope: 'notifications',
  state: '3(#0/!~'
});

module.exports.login = function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
};

module.exports.callback = function (req, res) {
  var code = req.query.code;

  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:8000/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
  }
};

module.exports.auth = function (req, res) {
  res.redirect(authorization_uri);
};

module.exports.fitbit = function(req, res) {
  
};
