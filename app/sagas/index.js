require('es6-promise').polyfill()
import {delay} from 'redux-saga'
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import * as actions from '../actions'

import AV, {HSObj} from '../API/'

//卡牌查询
export function fetchHearthstone(name, option, filter) {
  //拼接域名
  let nameSt
  switch(name) {
    case 'cards': {
      nameSt = `${HSObj.link.cards}?`
      break;
    }
    case 'cardbacks': {
      nameSt = `${HSObj.link.backs}?`
      break;
    }
    case 'search': {
      nameSt = `${HSObj.link.search}/${filter}?`
      break;
    }
    case 'sets': {
      nameSt = `${HSObj.link.sets}/${filter}?`
      break;
    }
    case 'classes': {
      nameSt = `${HSObj.link.classes}/${filter}?`
      break;
    }
    case 'factions': {
      nameSt = `${HSObj.link.factions}/${filter}?`
      break;
    }
    case 'qualities': {
      nameSt = `${HSObj.link.qualities}/${filter}?`
      break;
    }
    case 'races': {
      nameSt = `${HSObj.link.races}/${filter}?`
      break;
    }
    case 'types': {
      nameSt = `${HSObj.link.types}/${filter}?`
      break;
    }
    case 'info': {
      nameSt = `${HSObj.link.info}?`
      break;
    }
    default: {
      nameSt = `${HSObj.link.cards}?`
    }
  }

  //拼接选项
  const keys = ['locale=zhCN']
  Object.keys(option).forEach((i) => {
    !!option[i] && keys.push(i + '=' + option[i])
  })
  const keysSt = keys.join('&')

  //异步请求
  const url = nameSt + keysSt;
  console.log(url);
  return fetch(url, HSObj.fetchInfo).then(response => response.json())
}

//yield call(delay, 1000)
export function * hearthstoneAsync(state) {
  yield put(actions.loading(true))
  try {
    const data = yield call(fetchHearthstone, state.name, state.option, state.filter)
    yield put(actions.cardsReceive(data))
    yield put(actions.loading(false))
  } catch (e) {
    yield put(actions.loading(false))
  }
}

export function * tipsAsync(state) {
  yield call(delay, 1000)
  yield put(actions.tips(false,''))
}

export default function * rootSaga() {
  yield * [
    takeLatest('CARDS_SEARCH', hearthstoneAsync),
    takeLatest('TIPS', tipsAsync)
  ]
}
