import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import createRootReducer from './reducers/reducers'
import { rootEpic } from './epics/epics';

const epicMiddleware = createEpicMiddleware();

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        epicMiddleware
        // ... other middlewares ...
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  )

  epicMiddleware.run(rootEpic);

  return store
}