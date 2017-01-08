import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView ,TouchableOpacity, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')
//缓存新请求前的卡组和总页数
let cardsCache = null, allPages = 0;
export default class Cards extends Component {
  constructor(props) {
    super(props);
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
      filter: 'Druid', //默认显示德鲁伊
      page: 1
    };
    this._cardsSearch = this._cardsSearch.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._pagesClick = this._pagesClick.bind(this);
  }

  componentDidMount() {
    //初始化
    this._cardsSearch()
  }

  //请求卡牌
  _cardsSearch(){
    //清空卡牌缓存
    cardsCache = null
    this.props.cardsSearch(this.state.name, this.state.option, this.state.filter)
  }

  //下拉刷新
  _onRefresh() {
    var self = this;
    setTimeout(function() {
      self.refs.PullRefresh.onRefreshEnd();
    }, 2000);
  }

  //翻页
  _pagesClick(o) {
    if ( o === 'left' && this.state.page > 1) {
      this.setState({page: this.state.page - 1})
    } else if ( o === 'right' && this.state.page < allPages) {
      this.setState({page: this.state.page + 1})
    } else {
      this.props.tips(true, '已经到尽头了哦')
      return false
    }
  }

  render() {
    const { common, cards, page } = this.props;
    const that = this;
    cardsCache = cards;

    const tmp = cardsCache.filter(function(a, b) {
      return (a.img !== undefined) && (a.type !== 'Hero') && (a.type !== 'Hero Power') //过滤掉没有图像、英雄本身
    });

    allPages = Math.ceil(tmp.length/9); //总页数

    const cardsDom = tmp.filter(function(a, b) {
      return (b < that.state.page * 9) && (b >= (that.state.page - 1) * 9) //每页选9个
    }).map(function(a, b) {
      return <TouchableOpacity
                onPress={that.props._cardsClick.bind(a, true, a.cardId)}
                key={a.cardId}
                style={{width: 100, height: 151, marginTop: -2, backgroundColor:'rgba(0,0,0,0)'}}>
                <Image source={{uri: a.img}} style={{width: 100, height: 151}}></Image>
                <Text style={{textAlign: 'center',color: '#624830', fontSize:12, marginTop: -5}}>{a.name}</Text>
             </TouchableOpacity>
    })

    return (
      <View>
        <View style={{
          height:height - 115,
          flexWrap:'wrap',
          flexDirection: 'row',
          justifyContent:'space-around',
          backgroundColor:'rgba(0,0,0,0)',
          paddingLeft:5,
          paddingRight:5
        }}>
        {cardsDom}
        </View>

        <View style={{
          width,
          position:'absolute',
          bottom: -52,
          flexDirection: 'row',
          justifyContent:'space-between',
          backgroundColor:'rgba(0,0,0,0)',
          paddingLeft:5,
          paddingRight:5
        }}>
          <TouchableOpacity
            onPress={this._pagesClick.bind(this,'left')}
            style={{paddingLeft:10,backgroundColor:'rgba(0,0,0,0)'}}>
            <Image style={{width:50,height:50}} source={require('../assets/images/left.png')}></Image>
          </TouchableOpacity>

          <Text style={{fontSize:14,paddingTop:19,color:'#fff'}}>{this.state.page} / {allPages}</Text>

          <TouchableOpacity
            onPress={this._pagesClick.bind(this,'right')}
            style={{paddingRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
            <Image style={{width:50,height:50}} source={require('../assets/images/right.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
