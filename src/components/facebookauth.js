
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
import actions from '../actions/actions';
import FBLogin from 'react-native-facebook-login';
import FitbitAuth from './fitbitauth';
import { FBLoginManager } from 'NativeModules';
import Search from './search';
import serverIpAddress from '../config/serverIpAddress';
import Swiper from 'react-native-swiper';

class FacebookAuth extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFacebookLogin() {
    // start loading users for main page
    this.checkAuth();
    this.eagerLoadUsers(this.handleNavigation.bind(this));
  }
  handleNavigation() {
    if (this.props.user.isAuthed) {
      this.props.navigator.push({
        name: 'Search',
        component: Search,
      });
    } else {
      this.props.navigator.push({
        name: 'FitbitAuth',
        component: FitbitAuth,
      });
    }
  }
  checkAuth() {
    fetch(`http://${serverIpAddress}:8000/auth?facebookId=${this.props.user.facebookId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.props.actions.setAuth(response);
      });
  }
  eagerLoadUsers(callback) {
    fetch(`http://${serverIpAddress}:8000/api/users?facebookId=${this.props.user.facebookId}&gender=${this.props.user.gender}`, {
      method: 'GET',
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseData) => {
      this.props.actions.saveUsers(responseData);
      callback();
    });
  }

  fetchCredentials(userId, token) {
    const api = `https://graph.facebook.com/v2.3/${userId}?fields=name,email,gender,birthday,age_range,picture.width(1000).height(1000)&access_token=${token}`;
    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.actions.saveFacebookCredentials(responseData);

        // // Dummy data for testing purposes
        // var _dummyUser = {
        //   email: 'blake@blakelively.com',
        //   facebookId: '1982923402394',
        //   firstName: 'Blake',
        //   lastName: 'Lively'
        // };

        // Save credentials to server
        fetch(`http://${serverIpAddress}:8000/api/user`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.props.user),
        })
        .then((response) => response.text())
        .then((responseText) => this.handleFacebookLogin())
        .catch(error => {
          console.error(error);
        });
      }).done();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content"
        />
        <View style={styles.titlebar}>
          <Text style={styles.titlebarText}>Papayatary</Text>
        </View>

        {/** BEGIN SWIPER **/}
        <View style={styles.swiperOuterContainer}>
          <Swiper 
            showsButtons={false}
            showsPagination={true}
            loop={false}
            dot={<View style={{backgroundColor:'rgba(0,13,134,.3)', width: 8, height: 8,borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
            activeDot={<View style={{backgroundColor: '#456BCB', width: 10, height: 10, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: 180,
            }}
          >

            <View style={styles.swiperInnerContainer}>
              <Text style={styles.swiperText}>Send "steps" to like someone...</Text>
              <Image
                style={styles.image}
                source={ require('../images/chloe-search-mockup.png') }
              />
            </View>

            <View style={styles.swiperInnerContainer}>
              <Text style={styles.swiperText}>If someone likes you back...</Text>
              <Image
                style={styles.image}
                source={ require('../images/chloe-modal-mockup.png') }
              />
            </View>
            
            <View style={styles.swiperInnerContainer}>
              <Text style={styles.swiperText}>Chat with your matches!</Text>
              <Image
                style={styles.image}
                source={ require('../images/chloe-message-mockup.png') }
              />
            </View>

          </Swiper>
        </View>
        {/** END SWIPER **/}


        <View style={styles.buttonContainer}>
          <FBLogin style={styles.button}
            permissions={['email', 'user_friends']}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={(data) => {
              // update Facebook credentials to the store and redirect user.
              this.fetchCredentials(data.credentials.userId, data.credentials.token);
              // this.handleFacebookLogin();
            }}
            onLoginFound={(data) => {
              // update Facebook credentials to the store and redirect user.
              this.fetchCredentials(data.credentials.userId, data.credentials.token);
              // this.handleFacebookLogin();
            }}
            onLogout={() => {
              // Delete a token...
              // console.log("Logged out.");
              // _this.setState({ user : null });
            }}
            onLoginNotFound={() => {
              console.log("No user logged in during facebook login");
            }}
            onError={(data) => {
              console.log("ERROR on facebook login");
              console.log(data);
            }}
            onCancel={() => {
              console.log("User cancelled facebook login");
            }}
            onPermissionsMissing={ (data) =>{
              console.log("Check permissions for facebook login");
              console.log(data);
            }}
          />
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
  swiperOuterContainer: {
    width: 340,
    height: 670,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 340,
    height: 400,
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
    width: 170,
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // shadowColor: 'gray',
    // shadowOffset: { width: 4, height: 4},
    // shadowOpacity: .6,
    // shadowRadius: 4,
    borderRadius: 5, 
    marginTop: -20,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: 'white',
  },
  swiperInnerContainer: {
    width: 340,
    height: 540,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: -20,
  },
  swiperText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: '#34529D',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);

