import App from './app';
import First from './first';


import React, {
  AppRegistry,
  Component,
  Navigator,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Navigation extends React.Component{
  render() {
    console.log('MADE IT!!!!');
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'first'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'first':
        return (<First navigator={navigator} title="first"/>);
      case 'second':
        return (<Second navigator={navigator} title="second" />);
    }
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

export default Navigation;