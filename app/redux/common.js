import { INIT, LOADING, TIPS } from '../actions/';

const initialState = {
  init: false,
  loading: false,
  tips: {
    state: false,
    info: ''
  }
}

export default function common(state = initialState, action) {
  switch(action.type) {
    case INIT: {
      return Object.assign({}, state, {
        init: action.play
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
    default: {
      return state
    }
  }
}
