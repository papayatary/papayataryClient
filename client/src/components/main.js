
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';


class Main extends Component {
  constructor(props) {
    super(props);
  }


  handleConfirm() {
    // check if user has enough currency
      // if so, take currency from user's wallet and connect users
      // else, display error
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.portrait}
          source={require('../images/blakelively001.jpg')}
        />

        <Text>
          Name: Blake Lively
        </Text>
        <Text>
          Age: 28
        </Text>
        <Text>
          Distance: 5 miles
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleConfirm.bind(this)}
        >
          <Text style={styles.buttonText}>5000 units</Text>
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
    padding: 5,
    margin: 10
  },
  buttonText: {
    fontSize: 15
  },
  portrait: {
    width: 200,
    height: 200
  }
});

export default Main;
