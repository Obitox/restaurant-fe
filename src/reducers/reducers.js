// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { homeReducer } from './homeReducer';
import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  homeReducer,
  loginReducer,
  registerReducer,
  cartReducer,
  orderReducer 
})

export default createRootReducer