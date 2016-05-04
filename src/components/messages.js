import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import TopNavBar from './topnavbar.js';


class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    this.props.navigator.pop();
  }


  render() {
    // console.log(this);

    // example of how to map messages {this.props.messages.map((messages, i) => ())};
   return (

      <View style={styles.container}>
        <TopNavBar navigator={this.props.navigator}/>
        <Text>  message 1 </Text>
        <Text>  message 2 </Text>
        <Text>  message 3 </Text>
        <Text>  message 4 </Text>  

        <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           onChangeText={(text) => 's'}
           value={'s'}
         />
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages); 
