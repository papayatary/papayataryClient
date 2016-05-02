
import React, {
  AppRegistry,
  Component,
  Navigator,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Auth from './auth';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Navigator
        initialRoute = {{name: 'Auth', component: Auth}}
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
  return state //the App component should have access to all of the state
};

// export default App;
export default connect(mapStateToProps)(App) //connects the App to the state so App can access it

