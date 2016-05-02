
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

class App extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: 'Auth', component: Auth}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    // count the number of func calls
                    console.log(route, navigator); 

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

export default App;
