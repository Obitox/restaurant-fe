import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import register from '../actions/registerActions';

function mapStateToProps(state) {
    return {
        message: state.registerReducer.message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        register: (user) => dispatch(register(user)) 
    };
}

class Register extends Component {
    state = {
        username: '',
        password: '', 
        firstName: '', 
        lastName: '', 
        address1: '', 
        address_alt: '', 
        phone: '', 
        email: '' 
    };

    handleSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password, 
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            address1: this.state.address, 
            address2: this.state.address_alt, 
            phone: this.state.phone, 
            email: this.state.email 
        };

        this.props.register(user);
        console.log("Message: " + this.props.message);
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
           [name]: value,
        });
    }

    render() {
        return (
            <RegisterForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);