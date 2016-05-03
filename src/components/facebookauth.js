
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import FBLogin from 'react-native-facebook-login';
import FitbitAuth from './fitbitauth';
import {FBLoginManager} from 'NativeModules'



class FacebookAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleSignup() {
    //check if fitbit is authed
    this.props.navigator.push({
      name: 'FitbitAuth',
      component: FitbitAuth
    });
    
  }

  render() {
    var _this = this;
    var user = this.state.user;
    return (
      <View style={styles.container}>
        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={ (data) => {
            console.log("Logged in!");
            console.log(data);
            this.handleSignup();
          }}
          onLogout={ () => {
            console.log("Logged out.");
            _this.setState({ user : null });
          }}  
          onLoginFound={ (data) => {
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
            this.handleSignup();
          }}
          onLoginNotFound={ () => {
            console.log("No user logged in.");
            _this.setState({ user : null });
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

export default FacebookAuth;
