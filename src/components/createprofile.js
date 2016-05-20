
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

import actions from '../actions/actions';
import serverIpAddress from '../config/serverIpAddress';
import Search from './search';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmitButton() {
    // If either the age and zip code fields are missing, re-render the page.
    if (this.props.user.age === null || this.props.user.zipCode === null) {
      // Set missing to true if it's not already true
      if (this.props.user.missingAgeOrZip !== true) {
        this.props.actions.toggleMissingAgeOrZip();
      }
      this.forceUpdate(); //force the page to re-render
    }
    // Otherwise, submit the data
    else {
      // Submit profile data to profile table
      var profileData = {
        facebookId: this.props.user.facebookId,
        age: this.props.user.age,
        gender: this.props.user.gender,
        zipCode: this.props.user.zipCode,
        picturePath: this.props.user.picture.data.url,
      };
      fetch(`http://${serverIpAddress}:8000/api/profile`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        // console.log('Create Profile Submit Response: ', responseText);
        fetch(`http://${serverIpAddress}:8000/api/users?facebookId=${this.props.user.facebookId}&gender=${this.props.user.gender}`, {
          method: 'GET',
        })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          this.props.actions.saveUsers(responseData);
        // Check if user is authenticated. If so, redirect somewhere...
          this.props.navigator.push({
            name: 'Search',
            component: Search,
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    // console.log('CreateProfile this.props: ', this.props);

    // On initial load, show render this view
    if (!this.props.user.missingAgeOrZip) {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="steelblue"
            barStyle="light-content"
          />
          <View style={styles.titlebar}>
            <Text style={styles.titlebarText}>Papayatary</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.pageTitle}>Submit Your Profile</Text>

            <Text style={styles.fieldLabel}>Name</Text> 
            <TextInput
              style={styles.fieldInput}
              value={this.props.user.firstName + ' ' + this.props.user.lastName}
            />

            <Text style={styles.fieldLabel}>Gender</Text>
            <TextInput
              style={styles.fieldInput}
              value={this.props.user.gender}
            />

            <Text style={styles.fieldLabel}>Age</Text>
            {/*Add logic for PickerIOS if wanted*/}
            <TextInput 
              style={styles.fieldInput}
              keyboardType={'number-pad'}
              onChangeText={(text) => this.props.actions.saveAge({text})}
              value={this.props.user.age}
              maxLength={2}
              placeholder={'enter age'}
            />

            <Text style={styles.fieldLabel}>Zip Code</Text>
            <TextInput 
              style={styles.fieldInput}
              keyboardType={'number-pad'}
              onChangeText={(text) => this.props.actions.saveZipCode({text})}
              value={this.props.user.zipCode}
              maxLength={5}
              placeholder={'enter zip code'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={this.handleSubmitButton.bind(this)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } 
    // If the user didn't enter an age or zip code, show this view
    else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="steelblue"
            barStyle="light-content"
          />
          <View style={styles.titlebar}>
            <Text style={styles.titlebarText}>Papayatary</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.pageTitle}>Submit Your Profile</Text>

            <Text style={styles.fieldLabelDefault}>Name</Text> 
            <TextInput
              style={styles.fieldInput}
              value={this.props.user.firstName+' '+this.props.user.lastName}
            />

            <Text style={styles.fieldLabel}>Gender</Text>
            <TextInput
              style={styles.fieldInput}
              value={this.props.user.gender}
            />
            <Text style={styles.fieldLabel}>
              <Text style={styles.fieldLabelDefault}>Age</Text>
              <Text style={styles.fieldLabelError}>  *this is a required field</Text>
            </Text>
            {/*Add logic for PickerIOS*/}
            <TextInput 
              style={styles.fieldInput}
              keyboardType={'number-pad'}
              onChangeText={(text) => this.props.actions.saveAge({text})}
              value={this.props.user.age}
              maxLength={2}
              placeholder={'enter age'}
            />

            <Text style={styles.fieldLabel}>
              <Text style={styles.fieldLabelDefault}>Zip Code</Text>
              <Text style={styles.fieldLabelError}>  *this is a required field</Text>
            </Text>
            <TextInput 
              style={styles.fieldInput}
              keyboardType={'number-pad'}
              onChangeText={(text) => this.props.actions.saveZipCode({text})}
              value={this.props.user.zipCode}
              maxLength={5}
              placeholder={'enter zip code'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={this.handleSubmitButton.bind(this)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
    shadowOffset: { width: 5, height: 5 },
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
  fieldLabelDefault: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: 'navy'
  },
  fieldLabelError: {
    fontSize: 11,
    color: 'red',
  },
  fieldInput: {
    height: 40,
    padding: 5,
    color: 'lightslategray',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
    width: 220,
    height: 40,
    backgroundColor: '#456BCB',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 4,
    borderRadius: 5, 
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: 'white',
  },
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
