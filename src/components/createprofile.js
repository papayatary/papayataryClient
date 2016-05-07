
import React, {
  AppRegistry,
  Component,
  PickerIOS,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
    this.state=  {
      text: 'hello'
    };
  }

  handleSubmitButton() {

    /** SUBMIT USER DATA TO USER TABLE IN POSTGRES **/
    var _fullNameArray = this.props.user.name.split(' ');
    var _userData = {
      email: this.props.user.email,
      firstName: _fullNameArray[0],
      lastName: _fullNameArray[_fullNameArray.length - 1],
      facebookID: this.props.user.facebookId
    };

    fetch('http://localhost:8000/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_userData)
    })
    .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      // console.log('Create Person Submit Response: ', responseText);
    })
    .catch(error => {
      console.error(error);
    });

    /** SUBMIT PROFILE DATA TO PROFILE TABLE IN POSTGRES **/
    var profileData = {
      age: 25,
      gender: this.props.user.gender,
      zipCode: '94568',
      picturePath: '/somePath'
    };

    fetch('http://localhost:8000/api/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
    .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      console.log('Create User Submit Response: ', responseText);
    })
    .catch(error => {
      console.error(error);
    });

    // Check if user is authenticated. If so, redirect somewhere...
    // this.props.navigator.push({
    //   name: 'Search',
    //   component: Search
    // });
  }

  handleChangeZip() {
    // console.log('THIS: ', this);
    this.props.actions.saveAgeAndZipCode();

  }

  render() {
    console.log('CreateProfile this.props: ', this.props);
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content"
        />
        <View style={styles.titlebar}>
          <Text style={styles.titlebarText}>Fit Something</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.pageTitle}>Create Your Profile</Text>

          <Text style={styles.fieldLabel}>Name</Text> 
          <TextInput
            style={styles.fieldInput}
            value={this.props.user.name}
          />

          <Text style={styles.fieldLabel}>Gender</Text>
          <TextInput 
            style={styles.fieldInput}
            value={this.props.user.gender}
          />

          <Text style={styles.fieldLabel}>Age</Text>
          {/*Add logic for PickerIOS*/}
          <TextInput 
            style={styles.fieldInput}
            onChangeText={(text) => this.props.actions.saveAge({text})}
            value={this.props.user.age}
            maxLength={2}
          />

          <Text style={styles.fieldLabel}>Zip Code</Text>
          <TextInput 
            style={styles.fieldInput}
            onChangeText={(text) => this.props.actions.saveZipCode({text})}
            value={this.props.user.zipCode}
            maxLength={6}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSubmitButton.bind(this)}
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  titlebar: {
    flex: 8,
    paddingTop: 30,
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  titlebarText: {
    color: 'white',
    fontSize: 22,
  },
  fieldContainer: {
    flex: 82,
    margin: 20,
    padding: 20, 
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'grey', 
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  pageTitle: {
    alignSelf: 'center',
    fontSize: 28,
    color: 'navy',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 18,
    color: 'navy',
  },
  fieldInput: {
    height: 40, 
    padding: 5,
    color: 'lightslategray',
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 10,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems:'center',
  },
  button: {
    padding: 12,
    width: 250,
    height: 50,
    backgroundColor: 'cadetblue',  // cadetblue
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile); 
