
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
  }

  handleSubmitButton() {
    //-------------- SUBMIT USER DATA TO USER TABLE IN POSTGRES ----------------------------------/
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
      // console.log('Create User Submit Response: ', responseText);
    })
    .catch(error => {
      console.error(error);
    });

    //-------------- SUBMIT PROFILE DATA TO PROFILE TABLE IN POSTGRES ------------------------------/
    var profileData = {
      age: this.props.user.age,
      gender: this.props.user.gender,
      zipCode: this.props.user.zipCode,
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
      // console.log('Create Profile Submit Response: ', responseText);
    })
    .catch(error => {
      console.error(error);
    });

    // Check if user is authenticated. If so, redirect somewhere...
    this.props.navigator.push({
      name: 'Search',
      component: Search
    });
  }

  render() {
    // console.log('CreateProfile this.props: ', this.props);
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
          <Text style={styles.pageTitle}>Submit Your Profile</Text>

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
            placeholder={'enter age'}
          />

          <Text style={styles.fieldLabel}>Zip Code</Text>
          <TextInput 
            style={styles.fieldInput}
            onChangeText={(text) => this.props.actions.saveZipCode({text})}
            value={this.props.user.zipCode}
            maxLength={6}
            placeholder={'enter zip code'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    width: 375,
    height: 64,
    paddingTop: 24,
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  titlebarText: {
    color: 'white',
    fontSize: 22,
  },
  fieldContainer: {
    width: 340, 
    height: 460,
    padding: 20,
    marginTop: 36,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'grey', 
    shadowOffset: {width: 5, height: 5},
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
    alignSelf: 'flex-start',
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
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 90,
    width: 375,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems:'center',
  },
  button: {
    padding: 8,
    width: 250,
    height: 50,
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: 'gray', 
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 2,
    shadowRadius: 4,
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
