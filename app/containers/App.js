import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text ,Dimensions, View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Badge, Spinner, Drawer} from 'native-base'

import SideBar from '../components/sidebar';

import Home from '../pages/Home'
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
      title: 'Home',
      num: 0,
      sideBar: false,
      CurrentComponent: Home
    };
    this._changeComponent = this._changeComponent.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidMount() {
    //初始化应用
    this.props.init(true);

    console.log(this.props);

    var self = this;
    setInterval(function() {
      self.setState({ num: self.state.num + 1 })
    }, 1000);

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
  openDrawer() {
    this._drawer.open();
    this.setState({sideBar: true})
  }

  closeDrawer() {
    if (this.state.sideBar) {
      this.setState({sideBar: false})
      this._drawer.close()
    }
  }

  render() {
    const { CurrentComponent, title} = this.state;
    const { common, cards } = this.props;
    console.log(common.loading);
    return (
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          type="overlay"
          tweenDuration={150}
          content={<SideBar />}
          tapToClose
          acceptPan={false}
          onClose={() => this.closeDrawer()}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          styles={{
            drawer: {
              shadowColor: '#000000',
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
          }}
          tweenHandler={(ratio) => {  // eslint-disable-line
            return {
              drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
              main: {
                opacity: (2 - ratio) / 2,
              },
            };
          }}
          negotiatePan
        >

          <Image source={require('../assets/images/test.png')} style={styles.backgroundImage}>
            <Container>

                <Header>
                    <Button transparent onPress={this.openDrawer}>
                        <Icon name='ios-menu' />
                    </Button>
                    <Title>{ title }</Title>
                    <Button transparent onPress={this.closeDrawer}>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>

                <Content>
                  <CurrentComponent common={this.props.common} cards={this.props.cards} />
                  { common.loading === true ? <View style={styles.loadingWrap}><Spinner size='small' color='#fff' style={styles.loading}/></View> : null }
                </Content>

                <Footer >
                    <FooterTab>
                        <Button onPress={this._changeComponent.bind(this, 'Home', Home)} active={ title === 'Home'}>
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
        </Drawer>
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
