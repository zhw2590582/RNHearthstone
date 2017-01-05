import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class MyScene extends Component {
  static propTypes = {

  }

  static defaultProps = {
    title: 'home777555'
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
