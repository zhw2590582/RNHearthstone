import { combineReducers } from 'redux';
import cards from './cards';
import common from './common';

const rootReducer = combineReducers({
  cards,
  common
});

export default rootReducer
