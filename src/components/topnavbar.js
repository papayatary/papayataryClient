
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions'

import Matches from './matches.js';

class TopNavBar extends Component {
  constructor(props) {
    super(props);
  }

  handleHeart() {
    // Redirect somewhere...
  }

  handleMatches() {
    // Redirect somewhere...
    this.props.navigator.push({
      name: 'Matches',
      component: Matches
    });
  }

  render() {
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

function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar); 
