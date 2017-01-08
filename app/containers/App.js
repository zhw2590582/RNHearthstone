import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text ,Dimensions, View, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/'
import { Spinner} from 'native-base'

import Cards from '../components/Cards'
import Header from '../components/Header'

//映射 state 和 actions 到 Props
const mapStateToProps = (state) => ({
  common: state.common,
  cards: state.cards
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

class App extends Component {

  static propTypes = {
    common: React.PropTypes.object.isRequired,
    cards: React.PropTypes.array.isRequired
  }

  constructor() {
    super();
    this.state = {
      name: 'classes',
      option: {
        'attack': null, //攻击力
        'callback': null, //回调
        'collectible': 1, //为1时有效
        'cost': null, //费用
        'durability': null, //品质
        'health': null //回血
      },
      openClass:false,
      filterCN:'德鲁伊',
      filter:'Druid' //默认显示德鲁伊
    };
    this._openFilter = this._openFilter.bind(this);
    this._openSearch = this._openSearch.bind(this);
    this._cardsClick = this._cardsClick.bind(this);
    this._cardsClose = this._cardsClose.bind(this);
    this._openClass = this._openClass.bind(this);
    this._closeClass = this._closeClass.bind(this);
    this._chooseClass = this._chooseClass.bind(this);
  }

  componentDidMount() {
    //初始化应用
    var self = this;
    setInterval(function() {
      //self.setState({ num: self.state.num + 1 })
    }, 1000);
  }

  //过滤器
  _openFilter() {
    console.log('openFilter');
  }

  //职业
  _openClass() {
    this.setState({openClass: true})
  }

  _closeClass() {
    this.setState({openClass: false})
  }

  _chooseClass(name) {
    let nameSt
    switch(name) {
      case '德鲁伊': {
        nameSt = 'Druid'
        break;
      }
      case '猎人': {
        nameSt = 'Hunter'
        break;
      }
      case '法师': {
        nameSt = 'Mage'
        break;
      }
      case '圣骑士': {
        nameSt = 'Paladin'
        break;
      }
      case '牧师': {
        nameSt = 'Priest'
        break;
      }
      case '潜行者': {
        nameSt = 'Rogue'
        break;
      }
      case '萨满祭司': {
        nameSt = 'Shaman'
        break;
      }
      case '术士': {
        nameSt = 'Warlock'
        break;
      }
      case '战士': {
        nameSt = 'Warrior'
        break;
      }
      case '中立': {
        nameSt = 'Neutral'
        break;
      }
      default: {
        nameSt = 'Druid'
      }
    }
    this.setState({ filter: nameSt, filterCN:name, openClass: false })
    this.props.cardsSearch('classes', this.state.option, nameSt )
  }

  //搜索
  _openSearch() {
    console.log('openSearch');
  }

  //卡牌详情
  _cardsClick(play, url) {
    this.props.cardsDetilSearch(play,url)
  }

  //卡牌详情关闭
  _cardsClose() {
    this.props.cardsDetilClose()
  }

  render() {
    const { common, cards, cardsSearch, tips } = this.props;

    return (
      <Image source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
        <Header filterCN={this.state.filterCN} _openFilter={this._openFilter}  _openClass={this._openClass}  _openSearch={this._openSearch}/>

        <View style={styles.container}>
          <Cards filter={this.state.filter} tips={tips} common={common} cards={cards} cardsSearch={cardsSearch} _cardsClick={this._cardsClick} />

          { //加载器
            common.loading ?
            <View style={styles.loadingWrap}>
              <Spinner size='small' color='#fff' style={styles.loading}/>
            </View>
            :null
          }

          { //单卡展示
            common.cardDetil.state ?
            <View style={styles.cardWrap}>
              <TouchableOpacity style={styles.cardWrapBg} onPress={this._cardsClose}></TouchableOpacity>
              <Image source={{uri: common.cardDetil.url}} style={{width: 250, height: 378, marginTop:-100}}></Image>
            </View>
            :null
          }

          { //提示Tips
            common.tips.state ?
            <View style={styles.tipsWrap}>
              <View style={styles.tips}>
                <Text style={styles.tipsInner}>{common.tips.info}</Text>
              </View>
            </View>
            :null
          }

          { //选择职业
            this.state.openClass ?
            <View style={styles.cardWrap}>
              <TouchableOpacity style={styles.cardWrapBg} onPress={this._closeClass}></TouchableOpacity>
              <Image source={require('../assets/images/classBg.png')} style={styles.classBg}>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'德鲁伊')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'猎人')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'法师')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'圣骑士')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'牧师')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'潜行者')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'萨满祭司')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'术士')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'战士')}></TouchableOpacity>
                <TouchableOpacity style={styles.classBtn} onPress={this._chooseClass.bind(this,'中立')}></TouchableOpacity>
              </Image>
            </View>
            :null
          }

        </View>

      </Image>
    )
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null
  },
  loadingWrap:{
    flex: 1,
    height,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading:{
    width: 50,
    height: 50,
    marginTop: -100,
    borderRadius: 10,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  tipsWrap:{
    flex: 1,
    height,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tips:{
    width: 220,
    height: 30,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor:'rgba(0,0,0,0.7)'
  },
  tipsInner:{
    paddingTop:7,
    textAlign: 'center',
    color:'#fff',
  },
  cardWrap:{
    flex: 1,
    height,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardWrapBg:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    height,
    width,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  classBg:{
    position: 'absolute',
    top:0,
    width:320,
    height: 135,
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent:'space-around',
    paddingLeft:30,
    paddingRight:30,
  },
  classBtn:{
    width:45,
    height: 45,
    marginTop:8,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
