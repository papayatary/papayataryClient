
import React, {
  AppRegistry,
  Component,
  Navigator,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FacebookAuth from './facebookauth';
import actions from '../actions/actions'

class App extends Component {
  render() {
    // console.log('App props: ', this.props); //contains dispatcher and reducers
    return (
      <Navigator
        initialRoute = {{name: 'FacebookAuth', component: FacebookAuth}}
        configureScene = {() => {
            return Navigator.SceneConfigs.FloatFromRight; //define the route change animation
        }}
        renderScene = {(route, navigator) => {
          // count the number of func calls
          // console.log(route, navigator); 

          if (route.component) {
              return React.createElement(route.component, { navigator });
          }
        }}
     />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

function mapStateToProps(state) {
  return state; //the App component should have access to all of the state
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) //don't have to call this.props.dispatch(actions.addTodo(this.state.inputText));
    // can directly call the action instead
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App); //connects the App to the state so App can access it

