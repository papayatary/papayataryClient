
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

import TopNavBar from './topnavbar.js';

class Search extends Component {
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
        <TopNavBar />
        <Image
          style={styles.portrait}
          source={require('../images/blakelively001.jpg')}
        />

        <Text style={styles.profileText}>
          Name: Blake Lively
        </Text>
        <Text style={styles.profileText}>
          Age: 28
        </Text>
        <Text style={styles.profileText}>
          Distance: 5 miles
        </Text>

        <Text>
          BMI: 18
        </Text>
        <Text>
          Resting HR: 62
        </Text>
        <Text>
          Avg Daily Steps: 5000
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
  portrait: {
    flex: 50,
    width: 330,
    height: 250,
    borderWidth: 1
  },
  button: {
    flex: 4,
    backgroundColor: '#86B0FF',
    padding: 5,
    margin: 10
  },
  buttonText: {
    fontSize: 15
  },
});

export default Search;
