var request = require('request');
var secret = require('./keys');  // client api key

var clientId = '227LSD'; // Your client id
var redirectUri = 'http://localhost:8000/callback'; // Your redirect uri
var authUri = 'https://www.fitbit.com/oauth2/authorize';
var tokenRefreshUri = 'https://api.fitbit.com/oauth2/token';
var access;
// var tokenConfig = {
//   code: '<code>',
//   redirect_uri: 'http://localhost:3000/callback'
// };

var oauth2 = require('simple-oauth2')({
  clientID: '227LSD',
  clientSecret: secret,
  site: 'https://www.fitbit.com/',
  tokenPath: '/oauth2/token',
  authorizationPath: '/oauth2/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:8000/callback',
  response_code: 'code',
  scope: 'activity weight profile settings heartrate social sleep'
  //state: '3(#0/!~'
});

module.exports.auth = function (req, res) {
  res.redirect(authorization_uri);
};

module.exports.callback = function (req, res) {
  var code = req.query.code;
  console.log('body', code);

  var options = {
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')) 
    },
    form: {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8000/callback'
    }
  };

  // GET INITIAL TOKEN
  request.post(options, function(error, response, body) {
    if (error) {
      console.log('Error in token request', error);
    }
    access = JSON.parse(body);
    console.log('RESPONSE FROM AUTH CODE REQUEST SHD BE A TOKEN', access);
    console.log('time access expires in ', access.expires_in );

    access.expires_at = (new Date).addSeconds(access.expires_in);
    var expired = function () {
      var current = new Date;
      return ( access.expires_at.getTime() < current.getTime() ) ? true : false;
    };

    if ( expired() ) {
      // REFRESH TOKEN 
      var options = {
        url: 'https://api.fitbit.com/oauth2/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')) 
        },
        form: {
          refresh_token: access.refresh_token,
          grant_type: 'refresh_token'
        }
      };
      request.post(options, function(error, response, body) {
        console.log('refresh token', body);
        token = body; // VERIFY THAT THIS TOKEN IS WORKING PROPERLY
        console.log('get the token out of here and set it', body);
        // Do api call with refreshed token
        var options = {
          url: 'https://api.fitbit.com/1/user/-/activities/date/2016-04-29.json',
          headers: {
            'Authorization': 'Bearer ' + access.access_token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          console.log('activities data', body);
          res.json(body);
        });
      });

      
    } else {
      var options = {
        url: 'https://api.fitbit.com/1/user/-/activities/date/2016-04-29.json',
        headers: {
          'Authorization': 'Bearer ' + access.access_token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log('activities data', body);
        res.json(body);
      });
    }

    /*// for testing, destroy the token every time
    token.revoke('access_token', function(error) {
      // Session ended. But the refresh_token is still valid. 
     
      // Revoke the refresh_token 
      token.revoke('refresh_token', function(error) {
        console.log('token revoked.');
      });
    });*/

  });


  // function saveToken(error, result) {
  //   if (error) { 
  //     console.log('Access Token Error', error.message); 
  //   }
  //   console.log('RESULT', result);
  //   token = oauth2.accessToken.create(result);
  //   console.log('TOKEN ', token);

  //   if (token.expired()) {
  //     // Callbacks 
  //     token.refresh(function(error, result) {
  //       token = result;
  //     });
  //   } else {
  //     var options = {
  //       url: 'https://api.fitbit.com/1/user/-/activities/date/2016-04-29.json',
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       },
  //       json: true
  //     };
  //     request.get(options, function(error, response, body) {
  //       console.log(body);
  //       res.json(body);
  //     });
  //   }
  // }; 
};

