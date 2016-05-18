
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

import Swiper from 'react-native-swiper';
// import Swiper from './swiper.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Matches from './matches.js';
import helpers from '../utilities/helpers.js';
import serverIpAddress from '../config/serverIpAddress';

// import TopNavBar from './topnavbar.js';

class Search extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    fetch(`http://${serverIpAddress}:8000/api/wallet?facebookId=${this.props.user.facebookId}`,{
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      this.props.actions.setSteps(responseData);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Prevent re-render when state is updated!
    console.log('NEXT PROPS: ', nextProps);
    console.log('NEXT STATE: ', nextState);

    return false;
  }

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    // console.log('STATE: ', state);
    // console.log('CONTEXT: ', context.state);
    // console.log('USERS: ', this.props.user.users);
    var currentSearchUser = this.props.user.users[state.index];
    // console.log('CURRENT SEARCH USER: ', currentSearchUser);
    this.props.actions.setCurrentSearchUser(currentSearchUser);
  }

  handleConfirm() {

    // check if user has enough currency
    if (this.props.user.steps > this.props.user.currentSearchUser.steps) {
      fetch(`http://${serverIpAddress}:8000/api/match/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facebookId: this.props.user.facebookId,
          likedUserId: this.props.user.currentSearchUser.id,
        }),
      }).then(response => {
        return response.json();
      }).then(responseData => {
        if (responseData.newMatch) {
        // alert the user they have a new match, and update the new match button
        }
        this.props.actions.setSteps(responseData.steps); //update my balance
        // this.props.actions.incrementUsers(); //*UPDATE THIS**********************!
      });
    }
  }

  handleMatches() {
    this.props.navigator.push({
      name: 'Matches',
      component: Matches,
    });
  }

  handleDelete() {
    // update status in the Match table to unliked display the next person
  }

  handleNext() {
    // When the next button is clicked, remove the current user from the store, but don't delete it from the database.
  }

  handleMenu() {
    // Redirect to edit profile page once implemented...
  }

  render() { 
    return (
      <View style={styles.container}>
        {/** Begin top nav bar: **/}
        <View style={styles.navContainer}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={this.handleMenu.bind(this)}
          >
          </TouchableOpacity>

          <View style={styles.titleBox}>
            <Text style={styles.titleBoxText}>Papayatary</Text>
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={this.handleMatches.bind(this)}
          >
            <Icon style={styles.buttonIcon} name="heartbeat" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/** Begin swipe: **/}
        <View style={styles.swiperOuterContainer}>
          <Swiper 
            nextButton={(
              <Icon 
                style={styles.nextIcon} 
                name="chevron-circle-right" 
                size={32} 
                color="mediumvioletred" 
                // onPress={this.handleNext.bind(this)}
              />
            )}
            prevButton={(
              <Icon style={styles.noInterestIcon} name="times-circle" size={32} color="navy" />
            )}
            submitButton={(
              <TouchableOpacity 
                style={styles.button}
                onPress={this.handleConfirm.bind(this)}
              >
                <Text style={styles.buttonText}>Send {helpers.numberWithCommas( this.props.user.currentSearchUser.steps )} Steps</Text>
              </TouchableOpacity>
            )}
            onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
            showsButtons={true}
            buttonWrapperStyle={styles.swiperButton}
            loop={true}
          >

            {this.props.user.users.map((user) => {
              return (
                <View style={styles.swiperInnerContainer} key={user.id}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profileLeft}>
                      <Text style={styles.profileTextStrong}>{user.firstName}</Text>
                      <Text>
                        <Text style={styles.profileTextStrong}>Age:  </Text>
                        <Text style={styles.profileTextNormal}>{user.age}</Text>
                      </Text>
                    </View>
                    <View style={styles.profileRight}>
                      <Text>
                        <Text style={styles.profileTextStrong}>Resting Heart Rate:  </Text>
                        <Text style={styles.profileTextNormal}>{user.restingHeartRate}</Text>
                      </Text>
                      <Text>
                        <Text style={styles.profileTextStrong}>Avg Daily Steps:  </Text>
                        <Text style={styles.profileTextNormal}>{helpers.numberWithCommas( user.restingHeartRate * 80) }</Text>
                      </Text>
                    </View> 
                  </View>
                  <Image
                    style={styles.image}
                    source={{ uri: user.picturePath }}
                  />
                  <View style={styles.buttonContainer}>

                    <TouchableOpacity 
                      style={styles.button}
                      onPress={this.handleConfirm.bind(this, user)}
                    >
                      <Text style={styles.buttonText}>Send {helpers.numberWithCommas( user.steps )} Steps</Text>
                    </TouchableOpacity>

                  </View>
                </View>

              );  
            })}
          </Swiper>

          <View style={styles.balanceBox}>
            <Text style={styles.balanceText}>
              Your Balance:  {helpers.numberWithCommas( this.props.user.steps )} Steps
            </Text>
          </View>
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
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    height: 64,
  },
  swiperOuterContainer: {
    height: 603,
    width: 375,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Arial',
  },
  swiperInnerContainer: {
    height: 603,
    width: 375,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    top: -40,
  },
  titleBox: {
    width: 255,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
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
  profileContainer: {
    flexDirection: 'row',
    height: 60,
    width: 340,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 6,
    marginBottom: 2,
    // borderColor: 'lightgray',
    // borderWidth: 2,
  },
  profileLeft: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  profileRight: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  profileTextNormal: {
    fontSize: 16,
    fontWeight: '400',
    color: '#35638A',
  },
  profileTextStrong: {
    fontSize: 16,
    fontWeight: '600',
    color: '#35638A',
  },
  image: {
    backgroundColor: 'transparent',
    resizeMode: 'contain', // cover, contain, stretch, auto
    height: 420,
    width: 340,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    overflow: 'visible',
    shadowColor: 'grey',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 6,
    height: 100,
    width: 375,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  checkButton: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  nextIcon: {
    position: 'absolute',
    height: 30,
    left: -40,
    bottom: -250,
    alignSelf: 'center',
  },
  noInterestIcon: {
    position: 'absolute',
    height: 30,
    bottom: -250,
    left: 15,
    alignSelf: 'center',
  },
  submitIcon: {
    position: 'absolute',
    height: 30,
    bottom: -250,
    left: -30,
    alignSelf: 'center',
  },
  button: {
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    padding: 8,
    width: 200,
    height: 42,
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // shadowColor: 'gray',
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 2,
    // shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  balanceBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 24,
    width: 375,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  balanceText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 18,
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
