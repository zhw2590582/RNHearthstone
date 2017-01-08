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
      title: '卡牌',
      num: 0
    };
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

  //过滤器
  _openFilter() {
    console.log('openFilter');
  }

  //职业
  _openClass() {
    console.log('openClass');
  }

  //搜索
  _openSearch() {
    console.log('openSearch');
  }

  render() {
    const { common, cards, cardsSearch, tips } = this.props;

    return (
      <Image source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
        <Header _openFilter={this._openFilter}  _openClass={this._openClass}  _openSearch={this._openSearch}/>

        <View style={styles.container}>
            <Cards tips={tips} common={common} cards={cards} cardsSearch={cardsSearch} />

          {
            common.loading ?
            <View style={styles.loadingWrap}>
              <Spinner size='small' color='#fff' style={styles.loading}/>
            </View>
            :null
          }

          {
            common.tips.state ?
            <View style={styles.tipsWrap}>
              <View style={styles.tips}>
                <Text style={styles.tipsInner}>{common.tips.info}</Text>
              </View>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
