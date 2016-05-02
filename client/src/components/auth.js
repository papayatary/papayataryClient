
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FacebookAuth from './facebookauth';

class Auth extends Component {
    onPressFeed() {
        this.props.navigator.push({
            name: 'FacebookAuth',
            component: FacebookAuth
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    This is the Auth Component!
                </Text>

                <Text onPress={this.onPressFeed.bind(this)}>
                    Go to FacebookAuth Component!
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
});

export default Auth;
