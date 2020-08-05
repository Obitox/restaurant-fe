import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import loginAction from '../actions/loginActions';

const mapStateToProps = state => {
    return {
        username: state.loginReducer.username,
        accessToken: state.loginReducer.accessToken,
        refreshToken: state.loginReducer.refreshToken,
        csrfToken: state.loginReducer.refreshToken
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(loginAction(username, password))
    };
}

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = evt => {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    handleSubmit = () => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="main-login">
                <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.state}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);