
import React, {
  AppRegistry,
  Component,
  PickerIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions'
import Search from './search';



class CreateProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleSignup() {
    this.props.navigator.push({
      name: 'FacebookAuth',
      component: FacebookAuth
    });
  }

  handleLogin() {
    // Check if user is authenticated. If so, redirect somewhere...
    this.props.navigator.push({
      name: 'Search',
      component: Search
    });
  }

  render() {
    // console.log(this);
    return (
      <View style={styles.container}>
        <Text>Create Your Profile</Text>

        <Text>Gender:</Text>
        <PickerIOS
          selectedValue='Male'
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSignup.bind(this)}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleLogin.bind(this)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

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
  button: {
    backgroundColor: '#86B0FF',
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20
  }
});

function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile); 