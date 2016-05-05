
import React, {
  AppRegistry,
  Component,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';

import Matches from './matches.js';

// var Icon = require('react-native-vector-icons/FontAwesome');
import Icon from 'react-native-vector-icons/FontAwesome';
var myIcon = (<Icon name="heartbeat" size={30} color="white" />);

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
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleHeart.bind(this)}
        >
          <Icon style={styles.buttonIcon} name="bars" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.titleBox}>
          <Text style={styles.titleBoxText}>Papayatary</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleMatches.bind(this)}
        >
          <Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
  },
  titleBox: {
    flex: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBoxText: {
    color: 'white',
    fontSize: 22,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 20,
  },
  buttonIcon: {
    alignSelf: 'center',
    color: 'white',
  },
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
