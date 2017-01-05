import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text ,Dimensions, View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Badge, Spinner} from 'native-base'

//为方便修改下拉控件样式，直接把包引到源目录 @1.1.0
//假如不使用下拉控件，直接用 Content 组件替换
//import PullRefreshScrollView from '../assets/react-native-pullRefreshScrollView/'

import home from '../pages/home'
import page2 from '../pages/page2'
import page3 from '../pages/page3'
import page4 from '../pages/page4'
import page5 from '../pages/page5'

const { width, height } = Dimensions.get('window')

//映射 state 和 actions 到 Props
const mapStateToProps = (state) => ({
  common: state.common,
  cards: state.cards
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

class App extends Component {

  static propTypes = {
    common: React.PropTypes.object.isRequired,
    cards: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      title: 'home',
      sideBar: false,
      CurrentComponent: home
    };
    this._changeComponent = this._changeComponent.bind(this);
    this._changeSideBar = this._changeSideBar.bind(this);
  }

  componentDidMount() {
    //初始化应用
    this.props.init(true);

    console.log(this.props);

    //第一参数为类型(字符串)，第二参数为选项(对象)，第三参数为过滤器(字符串)
    this.props.cardsSearch('info', {

    }, 'Mountain')
  }

  //页面跳转
  _changeComponent(title, CurrentComponent) {
    this.setState({title, CurrentComponent})
    //停止加载
    this.props.loading(false);
  }

  //侧边栏
  _changeSideBar() {
    this.setState({sideBar: !this.state.sideBar})
  }

  onRefresh() {
    console.log('refresh');
    var self = this;
    setTimeout(function() {
      self.refs.PullRefresh.onRefreshEnd();
    }, 2000);
  }

  render() {
    const { CurrentComponent, title} = this.state;
    const { common, cards } = this.props;

    return (
      <Image source={require('../assets/images/test.png')} style={styles.backgroundImage}>
        <Container>
            <Header>
                <Button transparent onPress={this._changeSideBar}>
                    <Icon name='ios-menu' />
                </Button>
                <Title>{ title }</Title>
                <Button transparent>
                    <Icon name='ios-menu' />
                </Button>
            </Header>

            {/*
              <View style={styles.container}>
                <PullRefreshScrollView style={styles.pullRefresh} ref="PullRefresh" onRefresh={() => this.onRefresh()}>
                  <CurrentComponent common={this.props.common} cards={this.props.cards} />
                </PullRefreshScrollView>
                { common.loading === true ? <View style={styles.loadingWrap}><Spinner size='small' color='#fff' style={styles.loading}/></View> : null }
              </View>
            */}

            <Content>
              <CurrentComponent common={this.props.common} cards={this.props.cards} />
              { common.loading === true ? <View style={styles.loadingWrap}><Spinner size='small' color='#fff' style={styles.loading}/></View> : null }
            </Content>

            <Footer >
                <FooterTab>
                    <Button onPress={this._changeComponent.bind(this, 'home', home)} active={ title === 'home'}>
                        Apps
                        <Icon name='ios-apps-outline' />
                    </Button>
                    <Button onPress={this._changeComponent.bind(this, 'page2', page2)} active={ title === 'page2'}>
                        Camera
                        <Icon name='ios-camera-outline' />
                    </Button>
                    <Button onPress={this._changeComponent.bind(this, 'page3', page3)} active={ title === 'page3'}>
                        Navigate
                        <Icon name='ios-compass' />
                    </Button>
                    <Button onPress={this._changeComponent.bind(this, 'page4', page4)} active={ title === 'page4'}>
                        Contact
                        <Icon name='ios-contact-outline' />
                    </Button>
                    <Button onPress={this._changeComponent.bind(this, 'page5', page5)} active={ title === 'page5'}>
                        Contact
                        <Icon name='ios-contact-outline' />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
      </Image>
    )
  }
}

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
