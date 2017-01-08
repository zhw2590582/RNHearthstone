import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Header'
    };
  }

  render() {
    return (
      <View style={{marginTop:28,height:30, flexDirection: 'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={this.props._openFilter} style={{paddingLeft:19,backgroundColor:'rgba(0,0,0,0)'}} >
          <Text style={{fontSize:12,}}>过滤器</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props._openClass} style={{paddingRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
          <Text style={{fontSize:14,}}>{this.props.chooseClassCN}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props._openSearch} style={{paddingRight:25,backgroundColor:'rgba(0,0,0,0)'}}>
          <Text style={{fontSize:12,}}>搜索</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
