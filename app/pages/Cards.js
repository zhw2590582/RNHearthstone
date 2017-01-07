import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView } from 'react-native';

export default class Cards extends Component {
  static propTypes = {

  }

  static defaultProps = {
    title: '卡牌'
  };

  constructor() {
    super();
    this.state = {
      cards: [], //初始化卡牌
      name: 'classes',
      option: {
        'attack': null, //攻击力
        'callback': null, //回调
        'collectible': null, //为1时有效
        'cost': null, //费用
        'durability': null, //品质
        'health': null, //回血
        'durability': null, //
      },
      filter: 'Druid', //默认显示德鲁伊
      loadPages: 2, //已加载页数
      pageNum: 10 //每次加载数目
    };
    this._cardsSearch = this._cardsSearch.bind(this);
  }

  componentDidMount() {
    this._cardsSearch()
  }

  _cardsSearch(){
    //第一参数为类型(字符串)，第二参数为选项(对象)，第三参数为过滤器(字符串)
    this.props.cardsSearch(this.state.name, this.state.option, this.state.filter)
  }

  render() {
    const { common, cards } = this.props;

    //选取10个
    let page = cards.filter((a,b) =>(b >= this.state.pageNum*(this.state.loadPages-1)) && (b < this.state.pageNum*this.state.loadPages));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(page)

    return (
      <View style={styles.cardScontainer}>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardScontainer: {
    backgroundColor:'rgba(0,0,0,0)'
  }
});
