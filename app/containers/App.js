import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text , Dimensions, View, TouchableOpacity, TextInput, StatusBar} from 'react-native'
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
      page:1,
      filterCN:'德鲁伊',
      filter:'Druid', //默认显示德鲁伊
      search:{
        state: false,
        text:''
      },
      openFilter:{
        state: false
      }
    };
    this._openFilter = this._openFilter.bind(this);
    this._closeFilter = this._closeFilter.bind(this);
    this._openSearch = this._openSearch.bind(this);
    this._closeSearch = this._closeSearch.bind(this);
    this._cardsClick = this._cardsClick.bind(this);
    this._cardsClose = this._cardsClose.bind(this);
    this._openClass = this._openClass.bind(this);
    this._closeClass = this._closeClass.bind(this);
    this._chooseClass = this._chooseClass.bind(this);
    this._pagesClick = this._pagesClick.bind(this);
    this._closeSubmit = this._closeSubmit.bind(this);
    this._chooseStar = this._chooseStar.bind(this);
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
    this._allClose()
    this.setState({ openFilter: {state: true} })
  }

  _closeFilter(){
    this.setState({ openFilter: {state: false} })
  }

  _chooseStar(star){
    console.log(star);
  }

  //职业
  _openClass() {
    this._allClose()
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
    this.setState({ filter: nameSt, filterCN:name, openClass: false, page:1 })
    this.props.cardsSearch('classes', this.state.option, nameSt )
  }

  //搜索
  _openSearch() {
    this._allClose()
    this.setState({ search: {state: true, text:''} })
  }

  //搜索关闭
  _closeSearch() {
    this.setState({ search: {state: false, text:''} })
  }

  //搜索提交
  _closeSubmit() {
    this.props.cardsSearch('search', this.state.option, encodeURI(this.state.search.text))
    let keyWord = this.state.search.text.substring(0,3) + '...'
    this.setState({ filterCN: keyWord})
    this._closeSearch()
  }

  //卡牌详情
  _cardsClick(play, url) {
    this._allClose()
    this.props.cardsDetilSearch(play,url)
  }

  //卡牌详情关闭
  _cardsClose() {
    this.props.cardsDetilClose()
  }

  //关闭所有弹窗
  _allClose() {
    this._cardsClose() //卡牌详情
    this._closeClass() //职业选择
    this._closeSearch() //搜索
    this._closeFilter() //过滤
  }

  //翻页
  _pagesClick(o, allPages) {
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
    const { common, cards, cardsSearch, tips } = this.props;
    console.log(this.state.search.text);
    return (
      <Image source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header filterCN={this.state.filterCN} _openFilter={this._openFilter}  _openClass={this._openClass}  _openSearch={this._openSearch}/>

        <View style={styles.container}>
          <Cards filter={this.state.filter}
                tips={tips}
                page={this.state.page}
                common={common}
                cards={cards}
                cardsSearch={cardsSearch}
                _cardsClick={this._cardsClick}
                _pagesClick={this._pagesClick}
          />

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

          { //搜索
            this.state.search.state ?
            <View style={styles.cardWrap}>
              <TouchableOpacity style={styles.cardWrapBg} onPress={this._closeSearch}></TouchableOpacity>
              <Image source={require('../assets/images/searchBg.png')} style={styles.searchBg}>
                <TextInput
                  style={{height: 35,color:'#fff',paddingLeft:40,fontSize:14}}
                  placeholder="搜索卡牌!"
                  maxLength={20}
                  onChangeText={(text) => this.setState({search:{state:true,text}})}
                  onSubmitEditing={this._closeSubmit}
                />
              </Image>
            </View>
            :null
          }

          { //过滤
            this.state.openFilter.state ?
            <View style={styles.cardWrap}>
              <TouchableOpacity style={styles.cardWrapBg} onPress={this._closeFilter}></TouchableOpacity>
              <Image source={require('../assets/images/startBg.png')} style={styles.startBg}>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,0)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,1)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,2)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,3)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,4)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,5)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,6)}></TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={this._chooseStar.bind(this,7)}></TouchableOpacity>
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
  },
  searchBg:{
    position: 'absolute',
    top:0,
    width:320,
    height: 37,
  },
  startBg:{
    position: 'absolute',
    top:0,
    width:320,
    height: 37,
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingLeft:25,
    paddingRight:25,
  },
  startBtn:{
    width:30,
    height: 30,
    marginTop:3,
    borderRadius: 20,
    backgroundColor:'rgba(0,0,0,0.5)',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
