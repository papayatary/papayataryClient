
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

  handleSignup() {
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
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={ (data) => {
            console.log("Logged in!");
            console.log(data);
            this.handleSignup();
          }}
          onLogout={ () => {
            // Delete a token...
            // console.log("Logged out.");
            // _this.setState({ user : null });
          }}  
          onLoginFound={ (data) => {
            console.log("Existing login found with data: ", data);
            console.log(this.props);
            this.handleSignup();
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
  return state; //the App component should have access to all of the state
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) //don't have to call this.props.dispatch(actions.addTodo(this.state.inputText));
    // can directly call the action instead
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth); //connects the App to the state so App can access it

