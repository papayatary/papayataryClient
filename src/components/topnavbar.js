
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';


class TopNavBar extends Component {
  constructor(props) {
    super(props);
  }

  handleHeart() {
    // Redirect somewhere...
  }

  handleMatches() {
    // Redirect somewhere...
  }

  render() {
    // console.log(this);
    return (
      <View style={styles.container}>
        <Text>Fitbit4Tinder</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleHeart.bind(this)}
        >
          <Text style={styles.buttonText}>Heart Logo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleMatches.bind(this)}
        >
          <Text style={styles.buttonText}>Matches Logo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0D3FF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignSelf: 'stretch'
  },
  button: {
    backgroundColor: '#86B0FF',
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 10
  }
});

export default TopNavBar;
