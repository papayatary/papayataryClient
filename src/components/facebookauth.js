
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
import serverIpAddress from '../config/serverIpAddress';

class FacebookAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFacebookLogin() {
    // start loading users for main page
    this.checkAuth();
    this.eagerLoadUsers(this.handleNavigation.bind(this));
  }
  handleNavigation() {
    if (this.props.user.isAuthed) {
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
  }
  checkAuth() {
    fetch(`http://${serverIpAddress}:8000/auth?facebookId=${this.props.user.facebookId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.props.actions.setAuth(response);
      });
  }
  eagerLoadUsers(callback) {
    fetch(`http://${serverIpAddress}:8000/api/users?facebookId=${this.props.user.facebookId}&gender=${this.props.user.gender}`, {
      method: 'GET',
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseData) => {
      this.props.actions.saveUsers(responseData);
      callback();
    });
  }

  fetchCredentials(userId, token) {
    const api = `https://graph.facebook.com/v2.3/${userId}?fields=name,email,gender,birthday,age_range,picture.width(1000).height(1000)&access_token=${token}`;
    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.actions.saveFacebookCredentials(responseData);

        // // Dummy data for testing purposes
        // var _dummyUser = {
        //   email: 'blake@blakelively.com',
        //   facebookId: '1982923402394',
        //   firstName: 'Blake',
        //   lastName: 'Lively'
        // };

        // Save credentials to server
        fetch(`http://${serverIpAddress}:8000/api/user`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.props.user),
        })
        .then((response) => response.text())
        .then((responseText) => this.handleFacebookLogin())
        .catch(error => {
          console.error(error);
        });
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
          <Text style={styles.titlebarText}>Papayatary</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={ {uri: 'http://i31.photobucket.com/albums/c374/haoming/Papayatary/chloe-search_zpsykw94olv.png'} }
          />

        </View>
        <View style={styles.buttonContainer}>
          <FBLogin style={styles.button}
            permissions={['email', 'user_friends']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={(data) => {
              // update Facebook credentials to the store and redirect user.
              this.fetchCredentials(data.credentials.userId, data.credentials.token);
              // this.handleFacebookLogin();
            }}
            onLoginFound={(data) => {
              // update Facebook credentials to the store and redirect user.
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
    height: 380,
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
    marginTop: -40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    alignItems: 'center',
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

