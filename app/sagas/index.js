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
    case 'single': {
      nameSt = `${HSObj.link.single}/${filter}?`
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
    if (data['error'] !== undefined) {
      yield put(actions.tips(true, '查询失败，请重试'))
    } else {
      yield put(actions.cardsReceive(data))
    }
    yield put(actions.loading(false))
  } catch (e) {
    yield put(actions.loading(false))
    yield put(actions.tips(true, e))
  }
}

//Tips
export function * tipsAsync(state) {
  yield call(delay, 1000)
  yield put(actions.init())
}

//单卡详情
export function * cardAsync(state) {
  yield put(actions.loading(true))
  try {
    const data = yield call(fetchHearthstone, 'single', {}, state.id)
    if (data['error'] !== undefined) {
      yield put(actions.tips(true, '查询失败，请重试'))
      yield put(actions.cardsDetilClose())
    } else {
      yield put(actions.cardsDetilReceive(data[0]['img'], data[0]['cardId']))
    }
    yield put(actions.loading(false))
  } catch (e) {
    yield put(actions.loading(false))
    yield put(actions.tips(true, e))
  }
}

export default function * rootSaga() {
  yield * [
    takeLatest('CARDS_SEARCH', hearthstoneAsync),
    takeLatest('TIPS', tipsAsync),
    takeLatest('CARDS_DETIL_SEARCH', cardAsync),
  ]
}
