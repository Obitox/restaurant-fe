import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../components/Heading';
import Heading from '../components/Heading';
import Navigation from '../components/Navigation';

import '../styles/header.scss';

function mapStateToProps(state) {
    return {
        username: state.loginReducer.auth.username
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Heading username={this.props.username} />
                <Navigation />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);