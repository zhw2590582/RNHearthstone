import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Title, Button, Content} from 'native-base'

export default class RNHeader extends Component {
  constructor() {
    super();
    this.state = {
      title: 'RNHeader'
    };
    this._openFilter = this._openFilter.bind(this);
    this._openSearch = this._openSearch.bind(this);
  }
  //顶部按钮
  _openFilter() {
    console.log('openFilter');
  }

  _openSearch() {
    console.log('openSearch');
  }

  render() {
    return (
      <Content>
          <Button transparent onPress={this._openFilter}>
              <Text>按职业</Text>
          </Button>
          <Title onPress={this._openTitle}>{ this.state.title }</Title>
          <Button transparent onPress={this._openSearch}>
              <Text>按类型</Text>
          </Button>
      </Content>
    )
  }
}
