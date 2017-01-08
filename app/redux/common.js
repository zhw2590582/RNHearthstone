import { INIT, LOADING, TIPS, CARDS_DETIL_SEARCH, CARDS_DETIL_RECEIVE, CARDS_DETIL_CLOSE } from '../actions/';

const initialState = {
  init: false,
  loading: false,
  tips: {
    state: false,
    info: ''
  },
  cardDetil:{
    state: false,
    url:''
  }
}

export default function common(state = initialState, action) {
  switch(action.type) {
    case INIT: {
      return Object.assign({}, state, {
        init: false,
        loading: false,
        tips: {
          state: false,
          info: ''
        }
      })
    }
    case LOADING: {
      return Object.assign({}, state, {
        loading: action.play
      })
    }
    case TIPS: {
      return Object.assign({}, state, {
        tips: {
          state: action.play,
          info: action.info
        }
      })
    }
    case CARDS_DETIL_SEARCH: {
      return Object.assign({}, state, {
        cardDetil: {
          state: action.play,
          url: action.url
        }
      })
    }
    case CARDS_DETIL_CLOSE: {
      return Object.assign({}, state, {
        cardDetil: {
          state: false,
          url: ''
        }
      })
    }
    default: {
      return state
    }
  }
}
