import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5

import './styles/style.scss';

import Home from './containers/Home';
import Login from './containers/Login';
import Header from './containers/Header';
import Register from './containers/Register';
import Footer from './components/Footer';
import Cart from './containers/Cart';

function mapStateToProps(state) {
    return {
        theme: state.homeReducer.theme
    };
}

class App extends Component {
    render() {
       const theme = this.props.theme;

        return (
            <div className={`app ${theme}`}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/cart" component={Cart} />
                    {/* <Route path="/switch" render={() => (<div>Miss</div>)} /> */}
                </Switch>
                <Footer />
            </div>       
        );
    }
}

export default connect(
    mapStateToProps,
)(App);