import React, {
  AppRegistry,
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';
import Messages from './messages.js';
import SearchBar from 'react-native-search-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import serverIpAddress from '../config/serverIpAddress';

class Matches extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    this.props.navigator.pop();
  }

  handleBackToSearch() {
    this.props.navigator.pop();
  }

  handleMenu() {
    // Redirect to edit profile page once implemented...
  }

  handleMessage(toUserData) {
    this.props.actions.setCurrentMessageId(toUserData);

    this.props.navigator.push({
      name: 'Message',
      component: Messages
    });
  }

  handleDeleteMatch(toUserId) {
    // First, delete from the store
    this.props.actions.deleteOneMatch(toUserId);

    // Then, update the database
    fetch(`http://${serverIpAddress}:8000/api/match?fromUserFacebookId=` + this.props.user.facebookId + '&toUserId=' + toUserId.toUserId, {
      method: 'DELETE'
    })
    .then((response) => {
      return response.json();
    })
    .then((deletedUser) => {
      // console.log('deletedUser: ', deletedUser);
    });

  }

  componentWillMount() {
    // Do this once immediately before the page renders
    this.populateMatches();
  }

  populateMatches() {

    // Fetch all matches
    fetch(`http://${serverIpAddress}:8000/api/match?fromUserFacebookId=` + this.props.user.facebookId, {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((matches) => {
      // console.log('populateMatches MATCHES: ', matches);

      // Add JSX syntax to matches data:
      var matchesJSX = [];
      for (var i = 0; i < matches.length; i++) {
        // trim the message down to two lines if longer than that
        let currentMessage = matches[i].profile.text;
        if (currentMessage.length > 55) {
          currentMessage = (matches[i].profile.text).slice(0, 56) + '...';
        }
        // Define delete swipe button text:
        let swipeoutDeleteButton = [
          {
            text: 'Delete',
            backgroundColor: 'red',
            color: 'azure',
            onPress: this.handleDeleteMatch.bind(this, { toUserId: matches[i].id }),
          },
        ];

        matchesJSX[i] = (
          <Swipeout 
            right={swipeoutDeleteButton}
            backgroundColor='transparent'
            autoClose='true'
            key={i}
          >
            <View style={styles.matchItemContainer}>
              <View style={styles.thumbImageContainer}>
                <Image 
                  style={styles.thumbImage}
                  source={{ uri: matches[i].profile.picturePath }}
                />
              </View>
              <View style={styles.messageContainer}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={this.handleMessage.bind( this, {toUserId: matches[i].id, firstName: matches[i].firstName, lastName: matches[i].lastName, picturePath: matches[i].profile.picturePath} )}
                  key={i}
                >
                  <Text style={styles.nameText}>{matches[i].firstName + ' ' + matches[i].lastName}</Text>
                  <Text style={styles.messageText}>{currentMessage}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swipeout>

        );
      }
      // Save both the "normal" matches data and the JSX matches data to the store:
      this.props.actions.saveAllMatches(matches, matchesJSX);

    })
    .catch(error => {
      console.error(error);
    });

  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.navContainer}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleBackToSearch.bind(this)}
          >
            <Icon style={styles.buttonIcon} name="user" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.titleBox}>
            <Text style={styles.titleBoxText}>Papayatary</Text>
          </View>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMenu.bind(this)}
          >
          </TouchableOpacity>
        </View>

        <View style={styles.matchListContainer}>
          <ScrollView>
            {this.props.match.matchesJSX}
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // iPhone 6 width is 375, height is 667, statusBar around 7
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    height: 64,
  },
  titleBox: {
    width: 255,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  titleBoxText: {
    color: 'white',
    fontSize: 22,
  },
  navButton: {
    width: 60,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonIcon: {
    alignSelf: 'center',
    color: 'white',
  },
  matchListContainer: {
    height: 580 ,
    width: 340,
    alignSelf: 'center',
    alignItems: 'flex-start',
    // padding: 4,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'azure',
  },
  matchItemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 80,
    width: 339,
    paddingTop: 20,
    paddingBottom: 20,
    // marginBottom: 5,
    backgroundColor: 'transparent',
    borderBottomColor: 'steelblue',
    borderBottomWidth: 1,
  },
  thumbImageContainer: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  thumbImage: {
    width: 50, 
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  messageContainer: {
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 15,
    color: '#35638A',
    fontWeight: '800'
  },
  messageText: {
    fontSize: 13,
    color: 'steelblue',
  },
  button: {
    backgroundColor: 'azure',
    padding: 10,
    height: 72,
    width: 250,
  },
  buttonText: {
    fontSize: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(Matches); 