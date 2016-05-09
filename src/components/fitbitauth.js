
import React, {
  AppRegistry,
  Component,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import CreateProfile from './createprofile.js';

class FitbitAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAuth() {
    this.props.navigator.push({
      name: 'CreateProfile',
      component: CreateProfile,
    });
  }
  // Open fitbit's authorization page in browser
  handleFitbitAuth() {
    var fitBitURL = ['https://www.fitbit.com/oauth2/authorize?',
                     'response_type=code&',
                     'client_id=227LFQ&',
                     'redirect_url=icymicy://foo&',
                     'scope=activity%20weight%20profile%20settings%20heartrate%20social%20sleep',
                    ].join('');

    Linking.canOpenURL(fitBitURL).then(supported => {
      if (supported) {
        Linking.openURL(fitBitURL);
      } else {
        console.log(`Don\'t know how to open URI: '${fitBitURL}`);
      }
    });
  }
  // Pass authorization code to server to handle oAuth
  authorizeFitbit(query) {
    fetch('http://localhost:8000/api/fitbit/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    }).then((response) => this.handleAuth())
      .done();
  }
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL.bind(this));
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
  // listens for return url event and passes authorization token to fetch method
  _handleOpenURL(event) {
    var query = {
      url: event.url,
      userId: this.props.user.id,
    };
    fetch('http://localhost:8000/api/fitbit/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((response) => {
      this.handleAuth();
    })
      .done();
  }
  // Posts authorization code to server to handle token authentication.
  render() {
    // console.log('Fitbit Auth this.props: ', this.props.user.id);
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
            onPress={this.handleFitbitAuth}
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
    shadowOffset: { width: 5, height: 5 },
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
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FitbitAuth);
