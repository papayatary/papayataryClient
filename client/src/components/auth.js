
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import FacebookAuth from './facebookauth';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  handleSignup() {
    this.props.navigator.push({
      name: 'FacebookAuth',
      component: FacebookAuth
    });
  }

  render() {
    console.log('Auth Props: ', this.props);
    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style={styles.button}
          onPress={this.handleSignup.bind(this)}
          underlayColor={'#1B31FF'} //color on click
        >
          <Text>Signup</Text>
        </TouchableHighlight>

        <Text style={styles.welcome}>
          This is the Auth Component!
        </Text>

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
  }
});

export default Auth;
