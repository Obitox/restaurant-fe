import React from 'react'

const LoginForm = (props) => {
    return (
        <form className="login-form" >
            <input type="text" name="username" value={props.username} onChange={props.handleChange}/>
            <input type="password" name="password" value={props.password} onChange={props.handleChange} />
            <input type="submit" value="Submit" onClick={props.handleSubmit}/>
        </form>
    )
}

export default LoginForm;
