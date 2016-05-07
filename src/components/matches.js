
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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';
import Messages from './messages.js';
import SearchBar from 'react-native-search-bar';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  handleMessage(id) {
    // Check if user is authenticated. If so, redirect somewhere...
    this.props.navigator.push({
      name: 'Message',
      component: Messages
    });
  }

  render() {
    // console.log(this);

    // example of how to map messages {this.props.messages.map((messages, i) => ())};
   return (
      <View style={styles.container} >
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
          <View style={styles.matchItemContainer}>
            <View style={styles.thumbImageContainer}>
              <Image 
                style={styles.thumbImage}
                source={require('../images/blakelively001.jpg')}
              />
            </View>
            <View style={styles.messageContainer}>
              <TouchableOpacity 
              style={styles.button}
              onPress={this.handleMessage.bind(this)}
              >
                <Text style={styles.messageText}>Name</Text>
                <Text style={styles.messageText}>Hi Jake, how's things?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.matchItemContainer}>
            <View style={styles.thumbImageContainer}>
              <Image 
                style={styles.thumbImage}
                source={require('../images/blakelively001.jpg')}
              />
            </View>
            <View style={styles.messageContainer}>
              <TouchableOpacity 
              style={styles.button}
              onPress={this.handleMessage.bind(this)}
              >
                <Text style={styles.messageText}>Name</Text>
                <Text style={styles.messageText}>Hi Jake, how's things?</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    height: 560 ,
    width: 340,
    alignSelf: 'center',
    alignItems: 'flex-start',
    padding: 4,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'lightgray',
  },
  matchItemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 80,
    width: 332,
    padding: 4,
    marginBottom: 4,
    backgroundColor: 'white',
  },
  thumbImageContainer: {
    width: 72,
    height: 72,
  },
  thumbImage: {
    width: 72, 
    height: 72,
    resizeMode: 'contain',
  },
  messagesContainer: {
    //flex: 82,
  },
  messageText: {
    fontSize: 14,
    color: 'navy',
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
