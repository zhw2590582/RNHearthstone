export const CARDS_SEARCH = 'CARDS_SEARCH';
export const CARDS_RECEIVE = 'CARDS_RECEIVE';
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

//加载中
export function loading(play) {
  return {
    type: LOADING,
    play
  };
}

//错误信息
export function tips(play, info) {
  return {
    type: TIPS,
    play,
    info
  };
}

//初始化
export function init(play) {
  return {
    type: INIT,
    play
  };
}
