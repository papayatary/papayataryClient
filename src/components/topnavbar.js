
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
    this.searchIcon = (<Icon style={styles.buttonIcon} name="user" size={30} color="white" />);
    this.matchesIcon = (<Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />);
    this.menuIcon = (<Icon style={styles.buttonIcon} name="bars" size={30} color="white" />);
    this.backIcon = (<Icon style={styles.buttonIcon} name="chevron-left" size={30} color="white" />);
    // initialize left and right icons as they appear on the search page
    // this.leftIcon = this.menuIcon;
    // this.rightIcon = this.matchesIcon;
  }
  // console.log(this.props.currentPage.page);
  handleRightNav() {
    let currentPage = this.props.currentPage.page;
    switch (currentPage) {
      // if on search page heart icon clicked, do the following
      case "search":
        this.rightIcon = this.searchIcon;
        this.props.actions.setCurrentPage('matches');
        this.props.navigator.push({
          name: 'Matches',
          component: Matches
        });
        break;
      // if on matches page and user icon clicked, do the following
      case "matches":
        this.rightIcon = this.matchesIcon;
        this.props.navigator.pop();
        this.rightIcon = this.matchesIcon;
        break;
      // if on the edit profile page and user icon clicked, do the following
      case "menu":
        this.props.navigator.push({
          name: 'Search',
          component: Search
        });
        this.rightIcon = this.matchesIcon;
        this.props.actions.setCurrentPage('search');
        break;
      // if on the messages page, there should be no right icon
      case "messages":
        this.props.navigator.push({
          name: 'Search',
          component: Search
        });
        this.rightIcon = this.menuIcon;
        this.leftIcon = this.backIcon;
        this.props.actions.setCurrentPage('messages');
        break;
      default:
        this.rightIcon = this.matchesIcon;
    }
  }

  handleLeftNav(currentPage) {
    switch (currentPage) {
      // if on search page & menu icon clicked, do the following
      case "search":
        // TODO: edit profile page to be implemented....
        break;
      // if on matches page and menu icon clicked, do the following
      case "matches":
        // TODO: edit profile page to be implemented....
        break;
      // if on the edit profile page, there should be no left icon
      case "menu":
        // No icon here, set it to be blank
        break;
      // if on the messages page and chevron-left clicked, go back to match
      case "messages":
        this.props.actions.setCurrentPage('matches');
        this.rightIcon = this.searchIcon;
        this.leftIcon = this.menuIcon;
        this.props.navigator.pop();
        break;
      default:
        this.rightIcon = this.matchesIcon;
    }
  }

  /*handleMenu() {
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
  }*/

  render() {
    // let matchesIcon = (<Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />);
    // let messagesIcon = (<Icon style={styles.buttonIcon} name="bars" size={30} color="white" />);
    // {condition ? {matchesIcon} : {messagesIcon}}
    console.log('Current page state: ', this.props.currentPage.page);
    console.log('YOLOOOOSWAG: ', this.props.icon);
    // if (this.props.icon === 'matches') {
    //   this.rightIcon = this.matchesIcon;
    // } else 
    if (this.props.icon === 'matches') {
      this.rightIcon = this.matchesIcon;
      this.leftIcon = this.menuIcon;
    }
    return (
      <View style={styles.navContainer}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={this.handleLeftNav.bind(this)}
        >
          {this.leftIcon}
        </TouchableOpacity>

        <View style={styles.titleBox}>
          <Text style={styles.titleBoxText}>Papayatary</Text>
        </View>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={this.handleRightNav.bind(this)}
        >
          {this.rightIcon}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
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
  navButton: {
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
