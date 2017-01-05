import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

export default class SideBar extends Component {
  render() {
    return (
      <Content theme={sidebarTheme} style={styles.sidebar}>
        <Image style={styles.drawerCover}>
          <Image square style={styles.drawerImage} />
        </Image>
        <List>
          <ListItem button iconLeft>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#0209D8', paddingLeft: 14 }]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Anatomy</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0' }]}>
                <Icon name="ios-notifications-outline" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Badge</Text>
            </View>
          </ListItem>
        </List>
      </Content>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const sidebarTheme = {
  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
  lineHeight: (Platform.OS === 'ios') ? 20 : 24,

  // List
  listBorderColor: '#fff',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: 10,
  listNoteColor: '#808080',
  listNoteSize: 13,
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingLeft: 11,
    paddingTop: (Platform.OS === 'android') ? 7 : 5,
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: (Platform.OS === 'android') ? 21 : 25,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});
