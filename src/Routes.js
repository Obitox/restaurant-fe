import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

const store = configureStore(/* provide initial state if any */)

// import Home from './containers/Home';
// import Login from './containers/Login';
// import Header from './containers/Header';
// import Register from './containers/Register';
// import Footer from './components/Footer';
import App from './App';

const Routes = () => {
    return <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <> { /* your usual react-router v4/v5 routing */ }
                <App />
            </>
        </ConnectedRouter>
    </Provider>
}

export default Routes;