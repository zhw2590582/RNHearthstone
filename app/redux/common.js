import { INIT, LOADING, ERROR } from '../actions/';

const initialState = {
  init: false,
  loading: false,
  error: {
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
    case ERROR: {
      return Object.assign({}, state, {
        error: {
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
