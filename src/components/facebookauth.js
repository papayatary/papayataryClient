
import React, {
  AppRegistry,
  Component,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import FBLogin from 'react-native-facebook-login';
import FitbitAuth from './fitbitauth';
import { FBLoginManager } from 'NativeModules';
import Search from './search';

class FacebookAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFacebookLogin() {
    var facebookId = { facebookId: this.props.user.id };
    // check if fitbit is authed
    fetch('http://localhost:8000/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facebookId),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // store authorization
        if (response) {
          this.props.navigator.push({
            name: 'Search',
            component: Search,
          });
        } else {
          this.props.navigator.push({
            name: 'FitbitAuth',
            component: FitbitAuth,
          });
        }
      }).done();
  }
  fetchCredentials(userId, token) {
    var api = `https://graph.facebook.com/v2.3/${userId}?fields=name,email,gender,birthday,age_range,picture&access_token=${token}`;
    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('fetched data from facebook',responseData);
        //Rename fetched Facebook "id" to "facebookId" to correspond with database naming convention
        responseData.facebookId = responseData.id;
        delete responseData.id;
        //store credentials in state
        console.log('fetched data from facebook', responseData);
        // store credentials in state
        this.props.actions.saveFacebookCredentials(responseData);
        // save to database as well
        // this.saveCredentials(responseData);
        this.handleFacebookLogin();
      }).done();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content"
        />
        <View style={styles.titlebar}>
          <Text style={styles.titlebarText}>FitDate</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../images/sample-intro-v1.jpg')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <FBLogin style={styles.button}
            permissions={'email', 'user_friends'}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={(data) => {
              // console.log('Successfully logged in with these credentials: ', credentials);
              // update Facebook credentials to the store and redirect user.
              this.fetchCredentials(data.credentials.userId, data.credentials.token);
              // this.handleFacebookLogin();
            }}
            onLoginFound={(data) => {
              // When existing credentials are found, grab credentials from database update store and redirect user.
              this.fetchCredentials(data.credentials.userId, data.credentials.token);
              // this.handleFacebookLogin();
            }}
            onLogout={() => {
              // Delete a token...
              // console.log("Logged out.");
              // _this.setState({ user : null });
            }}
            onLoginNotFound={() => {
              console.log("No user logged in during facebook login");
            }}
            onError={(data) => {
              console.log("ERROR on facebook login");
              console.log(data);
            }}
            onCancel={() => {
              console.log("User cancelled facebook login");
            }}
            onPermissionsMissing={ (data) =>{
              console.log("Check permissions for facebook login");
              console.log(data);
            }}
          />
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  titlebar: {
    width: 375,
    height: 64,
    paddingTop: 24,
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  titlebarText: {
    color: 'white',
    fontSize: 22,
  },
  imageContainer: {
    width: 340,
    height: 540,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  image: {
    width: 340,
    height: 540,
    resizeMode: 'contain', // cover, contain, stretch, auto
    justifyContent: 'flex-start',
    overflow: 'visible',
    shadowColor: 'grey',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  buttonContainer: {
    flex: 10,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);

