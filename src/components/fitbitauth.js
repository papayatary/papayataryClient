
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Search from './search.js';

class FitbitAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFitbitAuth () {
    this.props.navigator.push({
      name: 'Search',
      component: Search
    });
  }

  render() {
    // console.log('Fitbit Auth this.props: ', this.props);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleFitbitAuth.bind(this)}
        >
          <Text style={styles.buttonText}>syncFitBit</Text>
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
});

export default FitbitAuth;
