import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Decks extends Component {
  static defaultProps = {
    title: '卡组'
  };

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
