import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView,TouchableOpacity } from 'react-native';
import PullRefreshScrollView from '../components/react-native-pullRefreshScrollView/'

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      name: 'classes',
      option: {
        'attack': null, //攻击力
        'callback': null, //回调
        'collectible': null, //为1时有效
        'cost': null, //费用
        'durability': null, //品质
        'health': null //回血
      },
      filter: 'Dream', //默认显示德鲁伊
      page: 1, //当前页
      allPages: 10 //总页
    };
    this._cardsSearch = this._cardsSearch.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._needHandlderArgument = this._needHandlderArgument.bind(this);
  }

  componentDidMount() {
    this._cardsSearch()
  }

  //请求卡牌
  _cardsSearch(){
    this.props.cardsSearch(this.state.name, this.state.option, this.state.filter)
  }

  //下拉刷新
  _onRefresh() {
    var self = this;
    setTimeout(function() {
      self.refs.PullRefresh.onRefreshEnd();
    }, 2000);
  }

  //下拉刷新
  _needHandlderArgument(argument) {
    console.log('argument');
  }

  render() {
    const { common, cards } = this.props;

    //选取10个
    let cardsDom = cards.map(function(a, b) {
      return <TouchableOpacity key={a.cardId} style={{width: 100, height: 151,backgroundColor:'rgba(0,0,0,0)'}} >
                <Image source={{uri: a.img}} style={{width: 100, height: 151}}></Image>
             </TouchableOpacity>
    })

    return (
      <PullRefreshScrollView style={styles.pullRefresh} ref="PullRefresh" onRefresh={() => this._onRefresh()}>
        <View style={{
          flexWrap:'wrap',
          flexDirection: 'row',
          justifyContent:'space-around',
          backgroundColor:'rgba(0,0,0,0)',
          paddingLeft:5,
          paddingRight:5
        }}>
          {cardsDom}
        </View>
      </PullRefreshScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
