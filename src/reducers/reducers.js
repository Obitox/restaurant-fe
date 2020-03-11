// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import homeReducer from './homeReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  homeReducer
})

export default createRootReducer