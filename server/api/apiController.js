var request = require('request');
var secret = require('./keys');  // client api key
var ClientOAuth2 = require('client-oauth2')

var clientId = '227LSD'; // Your client id
var redirectUri = 'http://localhost:8000/callback'; // Your redirect uri
var authUri = 'https://www.fitbit.com/oauth2/authorize';
var tokenRefreshUri = 'https://api.fitbit.com/oauth2/token';

 
var fitbitAuth = new ClientOAuth2({
  clientId: clientId,
  clientSecret: secret,
  accessTokenUri: tokenRefreshUri,
  authorizationUri: authUri,
  //authorizationGrants: ['authorization_code'],
  redirectUri: redirectUri,
  scopes: 'activity weight profile settings heartrate social sleep' // this was an array of comma sep str
});

module.exports.auth = function (req, res) {
  var uri = fitbitAuth.code.getUri();
  res.redirect(uri);
};
 
module.exports.callback = function (req, res) {
  fitbitAuth.code.getToken(req.url)
    .then(function (user) {
      console.log('User Response', user) //=> { accessToken: '...', tokenType: 'bearer', ... } 
      console.log('User data errors go here', user.data.errors);
      // Refresh the current users access token. 
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser === user) //=> true 
      })

      // Sign API requests on behalf of the current user. 
      user.sign({
        method: 'get',
        url: 'https://api.fitbit.com/1/user/-/activities/date/2016-04-29.json'
      })
        .then(function (res) {
          console.log(res.data.errors) //=> { body: { ... }, status: 200, headers: { ... } } 
        })
      // We should store the token into a database. 
      return res.send(user.accessToken)
    })
    .catch(function(err){
      console.log('getToken is erroring out', err.body);
    })
};

// var token = fitbitAuth.createToken('access token', 'optional refresh token', 'optional token type', { optional: 'raw user data' })
// // Refresh the users credentials and save the updated access token. 
// token.refresh().then(storeNewToken)
 
// token.request({
//   method: 'get',
//   url: tokenRefreshUri
// })
// .then(function (res) {
//   console.log(res) //=> { body: '...', status: 200, headers: { ... } } 
// });


