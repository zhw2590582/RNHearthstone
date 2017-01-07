import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text ,Dimensions, View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Badge, Spinner} from 'native-base'

//为方便修改下拉控件样式，直接把包引到源目录 @1.1.0
import PullRefreshScrollView from '../components/react-native-pullRefreshScrollView/'
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
    this.props.init(true);
    var self = this;
    setInterval(function() {
      //self.setState({ num: self.state.num + 1 })
    }, 1000);
  }

  _onRefresh() {
    var self = this;
    setTimeout(function() {
      self.refs.PullRefresh.onRefreshEnd();
    }, 2000);
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

  _openSearch() {
    console.log('openSearch');
  }

  render() {
    const { CurrentComponent, title} = this.state;
    const { common, cards, cardsSearch } = this.props;

    return (
      <Image source={require('../assets/images/test.png')} style={styles.backgroundImage}>

        <Container>
            <Header>
              <Button transparent onPress={this._openFilter}>
                  <Text>过滤</Text>
              </Button>
              <Title onPress={this._openTitle}>{ this.state.title }</Title>
              <Button transparent onPress={this._openSearch}>
                  <Text>搜索</Text>
              </Button>
            </Header>

            <View style={styles.container}>
              <PullRefreshScrollView style={styles.pullRefresh} ref="PullRefresh" onRefresh={() => this._onRefresh()}>
                <CurrentComponent common={common} cards={cards} cardsSearch={cardsSearch} />
              </PullRefreshScrollView>
              { common.loading === true ? <View style={styles.loadingWrap}><Spinner size='small' color='#fff' style={styles.loading}/></View> : null }
            </View>

            <Footer >
              <FooterTab>
                  <Button onPress={this._changeComponent.bind(this, '卡牌', Cards)} active={ title === '卡牌'}>
                      卡牌
                  </Button>
                  <Button onPress={this._changeComponent.bind(this, '卡组', Decks)} active={ title === '卡组'}>
                      卡组
                  </Button>
              </FooterTab>
            </Footer>
        </Container>
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
  scrollItem: {
    flex: 1,
    height: 80,
    marginBottom: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
