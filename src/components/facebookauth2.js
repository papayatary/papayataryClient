
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import Main from './main';

class FacebookAuth extends Component {
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
      name: 'Main',
      component: Main
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titlebar}>
            <Text style={styles.titlebarText}>Fitness Native</Text>
        </View>
        <Image
              style={styles.image}
              source={require('../images/sample-intro.jpg')}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSignup.bind(this)}
        >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>

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
    // flexWrap: 'nowrap',
    // backgroundColor: '#F5FCFF',
  },
  titlebar: {
    flex: 10,
    padding: 18,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 8,
    borderWidth: 2,
  },
  titlebarText: {
    color: 'black',
    fontSize: 24,
  },
  image: {
    flex: 80,
    margin: 5,
    // width: 100,
    // height: 200,
    // justifyContent: 'center',
    // alignSelf: 'stretch',
    overflow: 'hidden',
    borderColor: 'red',
    borderRadius: 8,
    borderWidth: 2,
  },
  button: {
    flex: 10,
    height: 1,
    alignSelf: 'stretch',
    alignItems:'center',
    backgroundColor: '#86B0FF',
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default FacebookAuth;
