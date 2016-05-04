
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
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';

import Messages from './messages.js'

class Matches extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    this.props.navigator.pop();
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
        <TopNavBar navigator={this.props.navigator}/>
        <TouchableOpacity 
        style={styles.button}
        onPress={this.handleMessage.bind(this)}
        >
          <Text style={styles.buttonText}> conversation 1 </Text>
        </TouchableOpacity>
       
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleBack.bind(this)}
        >
          <Text style={styles.buttonText}>Back</Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#86B0FF',
    padding: 10,
    margin: 20
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
