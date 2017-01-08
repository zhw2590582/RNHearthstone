export const CARDS_SEARCH = 'CARDS_SEARCH';
export const CARDS_RECEIVE = 'CARDS_RECEIVE';
export const CARDS_DETIL_SEARCH = 'CARDS_DETIL_SEARCH';
export const CARDS_DETIL_RECEIVE = 'CARDS_DETIL_RECEIVE';
export const CARDS_DETIL_CLOSE = 'CARDS_DETIL_CLOSE';
export const LOADING = 'LOADING';
export const TIPS = 'TIPS';
export const INIT = 'INIT';

//请求卡牌
export function cardsSearch(name, option, filter) {
  return {
    type: CARDS_SEARCH,
    name,
    option,
    filter
  };
}

//接收卡牌
export function cardsReceive(data) {
  return {
    type: CARDS_RECEIVE,
    data
  };
}

//卡牌详情查询
export function cardsDetilSearch(play, id) {
  return {
    type: CARDS_DETIL_SEARCH,
    play,
    id
  };
}

//卡牌详情接收
export function cardsDetilReceive(url, id) {
  return {
    type: CARDS_DETIL_RECEIVE,
    url,
    id
  };
}

//卡牌详情关闭
export function cardsDetilClose() {
  return {
    type: CARDS_DETIL_CLOSE
  };
}

//加载中
export function loading(play) {
  return {
    type: LOADING,
    play
  };
}

//tip
export function tips(play, info) {
  return {
    type: TIPS,
    play,
    info
  };
}

//初始化
export function init() {
  return {
    type: INIT
  };
}
