import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
//import TopNavBar from './topnavbar.js';
import Icon from 'react-native-vector-icons/FontAwesome';


class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBackToMatches() {
    this.props.navigator.pop();
  }

  handleMenu() {
    // Redirect to edit profile page once implemented...
  }

  render() {
    // console.log(this);

    // example of how to map messages {this.props.messages.map((messages, i) => ())};
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
            <Text style={styles.titleBoxText}>Papayatary</Text>
          </View>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMenu.bind(this)}
          >
          </TouchableOpacity>
        </View>
        <View style={styles.outerMessageListContainer}>
          <View style={styles.innerMessageListContainer}>
            <Text style={styles.leftMessageText}> message 1 </Text>
            <Text style={styles.rightMessageText}>  message 2 </Text>
            <Text style={styles.leftMessageText}>  message 3 </Text>
            <Text style={styles.rightMessageText}>  message 4 </Text>  
          </View>
        </View>


        <TextInput
           style={styles.messageTextInput}
           onChangeText={(text) => 's'}
           value={'What\'s up?'}
         />
      </View>
    );
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
  outerMessageListContainer: {
    height: 500 ,
    width: 336,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'lightgray',
  },
  innerMessageListContainer: {
    height: 492,
    width: 328,
    alignSelf: 'center',
    alignItems: 'flex-start',
    padding: 4,
    backgroundColor: 'white',
  },
  rightMessageText: {
    padding: 10,
    margin: 10,
    alignSelf: 'flex-end',
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'azure',
  },
  leftMessageText: {
    padding: 10,
    margin: 10,
    alignSelf: 'flex-start',
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'azure',
  },
  messageTextInput: {
    height: 40, 
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 4,
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages); 
