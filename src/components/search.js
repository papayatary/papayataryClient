
import React, {
  AppRegistry,
  Component,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions'  

import TopNavBar from './topnavbar.js';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    console.log(state, context.state);
  }

  handleConfirm() {
    // check if user has enough currency
      // if so, take currency from user's wallet and connect users
      // else, display error
  }

  render() {
    // this.props.actions.setCurrentPage('search');
    return (
      <View style={styles.container}>
        <TopNavBar style={styles.nav} navigator={this.props.navigator}/>
        <View style={styles.swiperOuterContainer}>
          <Swiper 
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            showsButtons={true}
            buttonWrapperStyle={styles.swiperButton}
          >

            <View style={styles.swiperInnerContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.profileLeft}>
                  <Text style={styles.profileText}>
                    Blake Lively
                  </Text>
                  <Text style={styles.profileText}>
                    Age: 28
                  </Text>
                  <Text style={styles.profileText}>
                    Distance: 5 miles
                  </Text>
                </View>
                <View style={styles.profileRight}>
                  <Text style={styles.profileText}>
                    BMI: 18
                  </Text >
                  <Text style={styles.profileText}>
                    Resting HR: 62
                  </Text>
                  <Text style={styles.profileText}>
                    Avg Daily Steps: 5000
                  </Text>
                </View> 
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../images/blakelively001.jpg')}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={this.handleConfirm.bind(this)}
                >
                  <Text style={styles.buttonText}>5000 units</Text>
                </TouchableOpacity>
              </View>
            </View>


          </Swiper>
        </View>
      </View>

      // OLD STYLING CODE:  -------------------
      // <View style={styles.container}>
      //   <TopNavBar style={styles.nav} navigator={this.props.navigator}/>
      //   <View style={styles.profileContainer}>
      //     <View style={styles.profileLeft}>
      //       <Text style={styles.profileText}>
      //         Blake Lively
      //       </Text>
      //       <Text style={styles.profileText}>
      //         Age: 28
      //       </Text>
      //       <Text style={styles.profileText}>
      //         Distance: 5 miles
      //       </Text>
      //     </View>
      //     <View style={styles.profileRight}>
      //       <Text style={styles.profileText}>
      //         BMI: 18
      //       </Text >
      //       <Text style={styles.profileText}>
      //         Resting HR: 62
      //       </Text>
      //       <Text style={styles.profileText}>
      //         Avg Daily Steps: 5000
      //       </Text>
      //     </View> 
      //   </View>
      //   <View style={styles.imageContainer}>
      //     <Image
      //       style={styles.image}
      //       source={require('../images/blakelively001.jpg')}
      //     />
      //   </View>
      //   <View style={styles.buttonContainer}>
      //     <TouchableOpacity 
      //       style={styles.button}
      //       onPress={this.handleConfirm.bind(this)}
      //     >
      //       <Text style={styles.buttonText}>5000 units</Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
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
  nav: {
    flex: 6,
  },
  swiperOuterContainer: {
    flex: 94,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  swiperButton: {
    // backgroundColor: 'transparent',
    top: -30,
  },
  profileContainer: {
    flex: 10,
    flexDirection: 'row',
    width: 360,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'azure',
    // borderColor: 'lightgray',
    // borderWidth: 2,
  },
  profileLeft: {
    paddingTop: 16,
    paddingLeft: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  profileRight: {
    paddingTop: 16,
    paddingRight: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    overflow: 'hidden',

  },
  profileText: {
    fontSize: 18,
    color: 'navy',
  },
  imageContainer: {
    flex: 40,
    //marginTop: 20,
    height: 380,
    width: 360,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'azure',
    borderColor: 'red',
  },
  image: {
    flex: 1,
    resizeMode: 'contain', // cover, contain, stretch, auto
    height: 400,
    width: 360,
    position: 'absolute',
    top: 0,
    shadowColor: 'grey', 
    shadowOffset: { width: 5, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  buttonContainer: {
    flex: 10,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 50,
    alignItems:'center',
  },
  button: {
    padding: 8,
    width: 250,
    height: 50,
    backgroundColor: 'cadetblue',
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

});
//
// OLD EXAMPLE CODE: ---------------------------------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: 'azure',
//   },
//   nav: {
//     flex: 6,
//   },
//   imageContainer: {
//     flex: 60,
//     //marginTop: 20,
//     height: 380,
//     width: 360,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     backgroundColor: 'azure',
//     borderColor: 'red',
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'contain', // cover, contain, stretch, auto
//     height: 400,
//     width: 360,
//     position: 'absolute',
//     top: 0,
//     shadowColor: 'grey', 
//     shadowOffset: { width: 5, height: 5},
//     shadowOpacity: 5,
//     shadowRadius: 5,
//   },
//   profileContainer: {
//     flex: 12,
//     flexDirection: 'row',
//     width: 360,
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//     alignItems: 'center',
//     backgroundColor: 'azure',
//     // borderColor: 'lightgray',
//     // borderWidth: 2,
//   },
//   profileLeft: {
//     paddingTop: 16,
//     paddingLeft: 0,
//     justifyContent: 'center',
//     alignSelf: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   profileRight: {
//     paddingTop: 16,
//     paddingRight: 0,
//     justifyContent: 'center',
//     alignSelf: 'flex-start',
//     alignItems: 'flex-end',
//   },
//   profileText: {
//     fontSize: 18,
//     color: 'navy',
//   },
//   buttonContainer: {
//     flex: 10,
//     alignSelf: 'stretch',
//     paddingTop: 20,
//     paddingBottom: 20,
//     alignItems:'center',
//   },
//   button: {
//     padding: 8,
//     width: 250,
//     height: 50,
//     backgroundColor: 'cadetblue',
//     marginBottom: 10,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'white',
//   },
// });

function mapStateToProps(state) {
  return state; 
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search); 