import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import createRootReducer from './reducers/reducers';
import { rootEpic } from './epics/epics';
import authMiddleware from './authMiddleware';

import { throttle } from 'lodash';

import { getAuthState, setAuthState, getCartState, setCartState } from './localStorage';

const epicMiddleware = createEpicMiddleware();

export const history = createBrowserHistory();

const preloadAuth = getAuthState();
const preloadCart = getCartState();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    { loginReducer: { auth: preloadAuth }, cartReducer: { cart: preloadCart }, ...preloadedState},
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        epicMiddleware,
        authMiddleware()
        // ... other middlewares ...
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  )

  store.subscribe(throttle(() => { 
        setAuthState(store.getState().loginReducer.auth || {});
        setCartState(store.getState().cartReducer.cart || {items: [], meals: []});
      }
  , 1000));

  epicMiddleware.run(rootEpic);

  return store
}

