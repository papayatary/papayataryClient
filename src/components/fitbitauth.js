
import React, {
  AppRegistry,
  Component,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions'
import CreateProfile from './createprofile.js';

class FitbitAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFitbitAuth () {
    this.props.navigator.push({
      name: 'CreateProfile',
      component: CreateProfile
    });
  }

  render() {
    // console.log('Fitbit Auth this.props: ', this.props);
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content"
        />
        <View style={styles.titlebar}>
          <Text style={styles.titlebarText}>FitDate</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../images/sample-intro-v1.jpg')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleFitbitAuth.bind(this)}
          >
            <Text style={styles.buttonText}>Connect to Fitbit</Text>
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
  imageContainer: {
    width: 340,
    height: 540,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  image: {
    width: 340,
    height: 540,
    resizeMode: 'contain', // cover, contain, stretch, auto
    justifyContent: 'flex-start',
    overflow: 'visible',
    shadowColor: 'grey', 
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(FitbitAuth); 
