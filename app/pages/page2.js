import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyScene extends Component {
  static defaultProps = {
    title: 'Page02'
  };

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
