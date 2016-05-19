'use strict';

import React, {
  Animated,
  AppRegistry,
  Modal,
  Component,
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';
import * as Animatable from 'react-native-animatable';
import Matches from './matches.js';

class MatchModal extends Component {

  constructor(props) {
    super(props);
  }
  handleMatches() {
    this.props.actions.setSearchModalVisible(false);
    this.props.navigator.push({
      name: 'Matches',
      component: Matches,
    });
  }
  handleClose(){
    this.props.actions.setSearchModalVisible(false);
  }
  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 30, 60, 0.8)',
    };

    return (
      <View>
        <Modal
          transparent={true}
          visible={this.props.user.isModalVisible}
          >
          <Animatable.View
            animation="fadeIn"
            duration={300}
            style={[styles.container, modalBackgroundStyle]}>
            <Animatable.View animation="bounceInRight" duration={800} style={styles.innerContainer}>
              <Text style={styles.buttonText}>You have matched with {this.props.user.match.firstName}</Text>
              <Animatable.Image
                style={styles.image}
                source={{ uri: this.props.user.match.picturePath }}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.handleMatches.bind(this)}
                  underlayColor="#A8D2E0">
                  <Text>Send Message</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.props.actions.setSearchModalVisible.bind(this, false)}
                  underlayColor="#A8D2E0">
                  <Text>Continue Papayatarying</Text>
                </TouchableHighlight>
              </View>
            </Animatable.View>
          </Animatable.View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  innerContainer: {
    top: 150,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    position: 'relative',
    left: 0,
    bottom: 0,
    height: 90,
    width: 375,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  button: {
    margin: 12,
    padding: 8,
    width: 250,
    height: 54,
    borderRadius: 15,
    backgroundColor: 'azure',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchModal);
