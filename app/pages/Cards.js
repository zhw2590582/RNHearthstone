import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView } from 'react-native';
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
      loadPages: 1, //已加载页数
      pageNum: 10 //每次加载数目
    };
    this._cardsSearch = this._cardsSearch.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
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

  render() {
    const { common, cards } = this.props;

    //选取10个
    let page = cards.filter((a,b) =>(b >= this.state.pageNum*(this.state.loadPages-1)) && (b < this.state.pageNum*this.state.loadPages));
    let fuck = page.map(function(a, b) {
      return <Image source={{uri: a.img}} style={{width: 100, height: 151}}></Image>
    })

    return (
      <PullRefreshScrollView style={styles.pullRefresh} ref="PullRefresh" onRefresh={() => this._onRefresh()}>
        <View style={{
          flexWrap:'wrap',
          flexDirection: 'row',
          justifyContent:'space-around',
          backgroundColor:'rgba(0,0,0,0)'
        }}>
          {fuck}
        </View>
      </PullRefreshScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
