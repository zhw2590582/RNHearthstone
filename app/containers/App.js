import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text ,Dimensions, View, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/'
import { Spinner} from 'native-base'
import Cards from '../pages/Cards'
import Decks from '../pages/Decks'

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
      title: '卡牌',
      num: 0,
      CurrentComponent: Cards
    };
    this._changeComponent = this._changeComponent.bind(this);
    this._openFilter = this._openFilter.bind(this);
    this._openSearch = this._openSearch.bind(this);
  }

  componentDidMount() {
    //初始化应用
    var self = this;
    setInterval(function() {
      //self.setState({ num: self.state.num + 1 })
    }, 1000);
  }

  //页面跳转
  _changeComponent(title, CurrentComponent) {
    this.setState({title, CurrentComponent})
    this.props.loading(false);
  }

  //顶部按钮
  _openFilter() {
    console.log('openFilter');
  }

  _openClass() {
    console.log('openClass');
  }

  _openSearch() {
    console.log('openSearch');
  }

  render() {
    const { CurrentComponent, title} = this.state;
    const { common, cards, cardsSearch } = this.props;

    return (
      <Image source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
        <View style={{marginTop:28,height:40, flexDirection: 'row',justifyContent:'space-between'}}>
          <TouchableOpacity onPress={this._openFilter} style={{paddingLeft:19,backgroundColor:'rgba(0,0,0,0)'}} >
            <Text style={{fontSize:12,}}>过滤器</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._openClass} style={{paddingRight:10,backgroundColor:'rgba(0,0,0,0)'}}>
            <Text style={{fontSize:14,}}>德鲁伊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._openSearch} style={{paddingRight:25,backgroundColor:'rgba(0,0,0,0)'}}>
            <Text style={{fontSize:12,}}>搜索</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <CurrentComponent common={common} cards={cards} cardsSearch={cardsSearch} />
          { common.loading === true ? <View style={styles.loadingWrap}><Spinner size='small' color='#fff' style={styles.loading}/></View> : null }
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
