import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Decks extends Component {
  static propTypes = {

  }

  static defaultProps = {
    title: '卡组'
  };

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
