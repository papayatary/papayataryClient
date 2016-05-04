
import React, {
  AppRegistry,
  Component,
  PickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions'
import Search from './search';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    // Check if user is authenticated. If so, redirect somewhere...
    this.props.navigator.push({
      name: 'Search',
      component: Search
    });
  }

  handleChangeZip() {
    console.log('Zip Changed!');
  }

  render() {
    console.log('CreateProfile this.props: ', this.props);
    return (
      <View style={styles.container}>
        <Text>Create Your Profile</Text>

        <Text>Name:</Text> 
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value='Hao H'
        />

        <Text>Age:</Text>

        <Text>Gender:</Text>
        {/*Add logic for PickerIOS*/}

        <Text>Zip Code:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value='94101'
          onChangeText={this.handleChangeZip.bind(this)}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
        >
          <Text style={styles.buttonText}>Submit</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile); 