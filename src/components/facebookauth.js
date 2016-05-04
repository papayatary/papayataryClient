
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FBLogin from 'react-native-facebook-login';
import FitbitAuth from './fitbitauth';
import {FBLoginManager} from 'NativeModules'
import actions from '../actions/actions'


class FacebookAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFacebookLogin() {
    //check if fitbit is authed
    this.props.navigator.push({
      name: 'FitbitAuth',
      component: FitbitAuth
    });
    
  }

  render() {
    return (
      <View style={styles.container}>

        <FBLogin style={{ marginBottom: 10, }}
          permissions={ ["email","user_friends"] }
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={ (credentials) => {
            // console.log('Successfully logged in with these credentials: ', credentials);

            // When existing credentials are found, save the updated Facebook credentials to the store and redirect user.
            this.props.actions.saveFacebookCredentials(credentials);
            this.handleFacebookLogin();
          }}
          onLoginFound={ (credentials) => {
            console.log('Login exists with the following user credentials: ', credentials)

            // When existing credentials are found, save the updated Facebook credentials to the store and redirect user.
            this.props.actions.saveFacebookCredentials(credentials);
            console.log('Fetched Credentials: ', this.props.user);
            this.handleFacebookLogin();
          }}
          onLogout={ () => {
            // Delete a token...
            // console.log("Logged out.");
            // _this.setState({ user : null });
          }}  
          onLoginNotFound={ () => {
            console.log("No user logged in.");
          }}
          onError={ (data) => {
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={ () => {
            console.log("User cancelled.");
          }}
          onPermissionsMissing={ (data) =>{
            console.log("Check permissions!");
            console.log(data);
          }}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth); 