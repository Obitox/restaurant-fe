import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { Route, Switch } from 'react-router'; // react-router v4/v5
// import { ConnectedRouter } from 'connected-react-router';
// import configureStore, { history } from './configureStore';


// import Home from './containers/Home';
// import Login from './containers/Login';
import Routes from "./Routes";

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);