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
      nameSt = `${HSObj.cards}?`
      break;
    }
    case 'backs': {
      nameSt = `${HSObj.backs}?`
      break;
    }
    case 'search': {
      nameSt = `${HSObj.search}/${filter}?`
      break;
    }
    case 'sets': {
      nameSt = `${HSObj.sets}/${filter}?`
      break;
    }
    case 'classes': {
      nameSt = `${HSObj.classes}/${filter}?`
      break;
    }
    case 'factions': {
      nameSt = `${HSObj.factions}/${filter}?`
      break;
    }
    case 'qualities': {
      nameSt = `${HSObj.qualities}/${filter}?`
      break;
    }
    case 'races': {
      nameSt = `${HSObj.races}/${filter}?`
      break;
    }
    case 'types': {
      nameSt = `${HSObj.types}/${filter}?`
      break;
    }
    case 'info': {
      nameSt = `${HSObj.info}?`
      break;
    }
    default: {
      nameSt = `${HSObj.cards}?`
    }
  }

  //拼接选项
  const keys = ['locale=zhCN']
  Object.keys(option).forEach((i) => {
    keys.push(i + '=' + option[i])
  })
  const keysSt = keys.join('&')

  //异步请求
  const url = nameSt + keysSt;
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
    yield put(actions.error(e))
  }
}

export default function * rootSaga() {
  yield * [
    takeEvery('CARDS_SEARCH', hearthstoneAsync)
  ]
}
