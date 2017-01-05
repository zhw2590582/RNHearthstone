import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'
const sagaMiddleware = createSagaMiddleware()

import createLogger from 'redux-logger'
import reducer from '../redux/'

const middleware = [ sagaMiddleware ]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
  require('../config/ReactotronConfig')
}

export default (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  )
  sagaMiddleware.run(mySaga)
  return store
}
