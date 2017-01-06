import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Cards extends Component {
  static propTypes = {

  }

  static defaultProps = {
    title: '卡牌'
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
