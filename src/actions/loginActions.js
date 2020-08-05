import * as api from '../superagent/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

const loginRequest = username => {
    return {
        type: 'LOGIN_REQUEST',
        username
    }
}

const loginSuccess = auth => {
    return {
        type: 'LOGIN_SUCCESS',
        auth
    }
}

const loginFailed = err => {
    return {
        type: 'LOGIN_FAILED',
        err
    }
}

export default function loginAction(username, password){
    return async dispatch => {
        const body = {
            username: username,
            password: password
        }
        dispatch(loginRequest(username));
        const res = await api.fetchDataWithParams(`/home/login`, body);
        dispatch(handleRes(res));    
    }
}

const handleRes = res => dispatch => {
    if(res.status == 400){
        dispatch(loginFailed(res.response.statusText))
        return
    }

    if(res.status == 401){
        dispatch(loginFailed(res.response.statusText));
        return
    }


    if(res.status == 200 && res.body){
        dispatch(loginSuccess(res.body))
        return
    }
}