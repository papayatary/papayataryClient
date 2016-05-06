
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
import Messages from './messages.js';
import Matches from './matches.js';

// var Icon = require('react-native-vector-icons/FontAwesome');
import Icon from 'react-native-vector-icons/FontAwesome';

class TopNavBar extends Component {
  constructor(props) {
    super(props);
  }
  // console.log(this.props.currentPage.page);

  handleMenu() {
    // Redirect somewhere...
  }

  // Transition from the Search page to the Matches page
  handleMatches() {
    this.props.actions.setCurrentPage('matches');
    this.props.navigator.push({
      name: 'Matches',
      component: Matches
    });
  }

  // Transition from the Matches page back to the Search page
  handleBackToSearch() {
    this.props.actions.setCurrentPage('search');
    this.props.navigator.pop();
  }

  // Transition from the Matches page to the Messages page
  handleMessages() {
    this.props.actions.setCurrentPage('messages');
    this.props.navigator.push({
      name: 'Search',
      component: Search
    });
  }

  // Transition from the Messages page back to the Matches page
  handleBackToMatches() {
    this.props.actions.setCurrentPage('matches');
    this.props.navigator.pop();
  }

  render() {
    let matchesIcon = (<Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />);
    let messagesIcon = (<Icon name="heartbeat" size={30} color="white" />);
    // {condition ? {matchesIcon} : {messagesIcon}}
    console.log('Current page state: ', this.props.currentPage.page);
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleMenu.bind(this)}
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
          {matchesIcon}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    paddingTop: 20,
  },
  titleBox: {
    flex: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
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
    // margin: 20,
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
