import { CARDS_SEARCH, CARDS_RECEIVE } from '../actions/';

const initialState = {}

export default function cards(state = initialState, action) {
  switch(action.type) {
    case CARDS_RECEIVE: {
      return Object.assign({}, state, action.data )
    }
    default: {
      return state
    }
  }
}
