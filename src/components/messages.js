
import React, {
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Navigator,
  Component,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';
import SearchBar from 'react-native-search-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import serverIpAddress from '../config/serverIpAddress';

import GiftedMessenger from 'react-native-gifted-messenger';
import Communications from 'react-native-communications';


window.navigator.userAgent = 'react-native';
// import './userAgent';
import io from 'socket.io-client/socket.io';


var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;

class Messages extends React.Component {
  constructor(props) {
    super(props);


    this._isMounted = false;
    this._messages = this.getInitialMessages() || [];
    
    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
      lastSentMessageId: '',
    };
  }

  handleBackToMatches() {
    this.props.navigator.pop();
  }

  handleMenu() {
    // Redirect to edit profile page once implemented...
  }

  componentWillMount() {
    this.socket = io(`${serverIpAddress}:8000`, {jsonp: false});

    this.socket.emit('connectedFacebookId', this.props.user.facebookId);

    this.socket.on( 'fetchLast', (incomingMessageId) => {
      console.log('CALL FETCH LAST FUNCTION!', incomingMessageId);
      this.fetchLastMessage(incomingMessageId);
    });
    
    this.socket = io(`${serverIpAddress}:8000`, {jsonp: false});

    this.socket.emit('connectedFacebookId', this.props.user.facebookId);

    this.socket.on( 'fetchLast', () => {
      // console.log('CALL FETCH LAST FUNCTION!');
      // console.log('THIS: ', this.getInitialMessages);
      this.getInitialMessages();
    } );

    //---------- The ES6 arrow syntax above will will automatically bind "this" --------//
    // this.socket.on( 'fetchLast', function() {
    //   console.log('THIS: ', this);
    // }.bind(this) );

  }
  
  componentDidMount() {
    this._isMounted = true;    
    
    // setTimeout(() => {
    //   this.setState({
    //     typingMessage: this.props.message.firstName + ' ' + this.props.message.lastName + ' is typing a message...',
    //   });
    // }, 1000); // simulating network

    // setTimeout(() => {
    //   this.setState({
    //     typingMessage: '',
    //   });
    // }, 3000); // simulating network
    
    
    // setTimeout(() => {
    //   this.handleReceive({
    //     text: 'Lets get coffee?', 
    //     name: this.props.message.firstName + ' ' + this.props.message.lastName, 
    //     image: {uri: this.props.message.picturePath}, 
    //     position: 'left', 
    //     date: new Date(),
    //     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
    //   });
    // }, 3300); // simulating network
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  getInitialMessages() {
    console.log('CALLED getInitialMessages!');
    // !!! Currently this will fetch all messages. Later on, implement this so that only 30 messages are retrieved immediately.
    // Fetch all messages between the current 2 users
    var _users = {
      fromUserFacebookId: this.props.user.facebookId,
      toUserId: this.props.message.toUserId,
    };
    fetch(`http://${serverIpAddress}:8000/api/message?fromUserFacebookId=` + _users.fromUserFacebookId + '&toUserId=' + _users.toUserId, {
      method: 'GET',
    })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((responseData) => {
      // console.log('getInitialMessages RESPONSE DATA: ', responseData);
      var _messages = [];
      for (var i = 0; i < responseData.length; i++) {
        // if the current message belongs to the "from" user...
        if (responseData[i].hasOwnProperty('fromUserFacebookId')) {
          _messages.push({
            text: responseData[i].text,
            name: this.props.user.firstName + ' ' + this.props.user.lastName,
            image: null,
            position: 'right',
            date: responseData[i].timestamp,
            uniqueId: responseData[i].id,
          });
        }
        // if the current message belongs to the "to" user...
        else {
          _messages.push({
            text: responseData[i].text,
            name: this.props.message.firstName + ' ' + this.props.message.lastName,
            image: {uri: this.props.message.picturePath},
            position: 'left',
            date: responseData[i].timestamp,
            uniqueId: responseData[i].id,
          });
        }
      }
      this.setMessages(_messages);

      // This should be an array of all initial messages
      return this.state.messages;

    })
    .catch(error => {
      console.error(error);
    });

    // This should be an array of all initial messages (dummydata below)
    // return [
    //   {
    //     text: 'Hello my name is Blake. Does this work?', 
    //     name: this.props.message.firstName + ' ' + this.props.message.lastName, 
    //     image: {uri: this.props.message.picturePath}, 
    //     position: 'left', 
    //     date: new Date(2016, 3, 14, 13, 0),
    //     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
    //   },
    //   {
    //     text: "Yes this works!", 
    //     name: this.props.user.firstName + ' ' + this.props.user.lastName, 
    //     image: null, 
    //     position: 'right', 
    //     date: new Date(2016, 3, 14, 13, 1),
    //     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
    //   },
    // ];
  }
  
  fetchLastMessage(incomingMessageId) {

    this.setState({
      typingMessage: this.props.message.firstName + ' ' + this.props.message.lastName + ' is typing a message...',
    });

    fetch(`http://${serverIpAddress}:8000/api/message/last?incomingMessageId=` + incomingMessageId, {
      method: 'GET',
    })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((responseData) => {
      console.log('fetchLastMessage RESPONSE DATA: ', responseData);

      this.setState({
        typingMessage: '',
      });

      var incomingMessage = {
        text: responseData.text,
        name: this.props.message.firstName + ' ' + this.props.message.lastName,
        image: {url: this.props.message.picturePath},
        position: 'left',
        date: responseData.timestamp,
        uniqueId: responseData.id,
      };

      this.setMessages(this._messages.concat(incomingMessage));

    })
    .catch(error => {
      console.error(error);
    });

  }

  setMessageStatus(uniqueId, status) {
    let messages = [];
    let found = false;
    
    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        let clone = Object.assign({}, this._messages[i]);
        clone.status = status;
        messages.push(clone);
        found = true;
      } else {
        messages.push(this._messages[i]);
      }
    }
    
    if (found === true) {
      this.setMessages(messages);
    }
  }
  
  setMessages(messages) {
    this._messages = messages;
    
    // append the message
    this.setState({
      messages: messages,
    });
  }
  
  handleSend(message = {}) {
    
    // Save one message to database
    var _message = {
      fromUserFacebookId: this.props.user.facebookId,
      toUserId: this.props.message.toUserId,
      text: message.text, 
      timestamp: new Date(),
    };
    fetch(`http://${serverIpAddress}:8000/api/message`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_message)
    })
    .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      var responseObject = JSON.parse(responseText);
      // console.log('Submit message server response text: ', responseText);
      message.uniqueId = responseObject.id; //set a unique id for the message
      this.setMessages(this._messages.concat(message)); //Append message and update state
      // console.log('NEW STATE: ', this.state);

      this.setState({
        lastSentMessageId: responseObject.id,
      });
      this.socket.emit('notifyOtherUserToFetchLast', { 
        fromUserFacebookId: this.props.user.facebookId, 
        toUserFacebookId: this.props.message.facebookId,
        lastSentMessageId: this.state.lastSentMessageId,
      });

    })
    .catch(error => {
      console.error(error);
    });

    
    // mark the sent message as Seen
    setTimeout(() => {
      this.setMessageStatus(message.uniqueId, 'Seen'); // here you can replace 'Seen' by any string you want
    }, 1000);

    // if you couldn't send the message to your server :
    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
  }
  
  onLoadEarlierMessages() {

    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    });
    
    // Your logic here
    // Eg: Retrieve old messages from your server

    // IMPORTANT
    // Oldest messages have to be at the begining of the array
    var earlierMessages = [
      {
        text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native', 
        name: this.props.message.firstName + ' ' + this.props.message.lastName, 
        image: {uri: this.props.message.picturePath}, 
        position: 'left', 
        date: new Date(2016, 0, 1, 20, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      }, {
        text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text', 
        name: this.props.user.firstName + ' ' + this.props.user.lastName, 
        image: null, 
        position: 'right', 
        date: new Date(2016, 0, 2, 12, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];

    setTimeout(() => {
      this.setMessages(earlierMessages.concat(this._messages)); // prepend the earlier messages to your list
      this.setState({
        isLoadingEarlierMessages: false, // hide the loader
        allLoaded: true, // hide the `Load earlier messages` button
      });
    }, 1000); // simulating network
    
  }
  
  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId

    this.setMessages(this._messages.concat(message));

  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '');
  }
  
  // will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    // Your logic here
    // Eg: Navigate to the user profile
  }
  
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleBackToMatches.bind(this)}
          >
            <Icon style={styles.buttonIcon} name="chevron-left" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.titleBox}>
            <Text style={styles.titleBoxText}>{this.props.message.firstName + ' ' + this.props.message.lastName}</Text>
          </View>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMenu.bind(this)}
          >
          </TouchableOpacity>
        </View>

          <GiftedMessenger
            ref={(c) => this._GiftedMessenger = c}
          
            //This inline styling will overwrite the default styling
            styles={{
              bubbleRight: {
                marginLeft: 70,
                backgroundColor: '#007aff',
              },
              container: {
                height: 603,
                width: 375,
              },
              textInput: {
                alignSelf: 'center',
                height: 30,
                width: 100,
                backgroundColor: 'azure',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ccc',
                paddingLeft: 10,
                flex: 1,
                padding: 0,
                margin: 0,
                fontSize: 15,
              },
            }}
            
            autoFocus={false} //text input auto focus
            messages={this.state.messages} 
            handleSend={this.handleSend.bind(this)}
            onErrorButtonPress={this.onErrorButtonPress.bind(this)}
            // maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT} //667 - 44 - 20 = 603
            maxHeight={603}
            placeholder={'Type a message...'}

            loadEarlierMessagesButton={!this.state.allLoaded}
            onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

            senderName={this.props.user.firstName + ' ' + this.props.user.lastName}
            senderImage={null}
            onImagePress={this.onImagePress}
            displayNames={false}
            
            parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
            handlePhonePress={this.handlePhonePress}
            handleUrlPress={this.handleUrlPress}
            handleEmailPress={this.handleEmailPress}
            
            isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
            
            typingMessage={this.state.typingMessage}
          />
        
        </View>



    );
  }
  
  handleUrlPress(url) {
    Linking.openURL(url);
  }

  // TODO: make this compatible with Android
  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;
    
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  }
  
  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

}

const styles = StyleSheet.create({
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
});

function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages); 
