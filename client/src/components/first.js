import React from 'react-native';

class First extends React.Component{
  navSecond(){
    this.props.navigator.push({
        title: 'second',
        component: Second
    })
  }
  render() {
    return (
      <View style={styles.content}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Navigate to second screen</Text>
        </TouchableHighlight>
      </View>
    );
  }