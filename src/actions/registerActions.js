import * as index from './index';
import * as api from '../superagent/api';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const registerSuccess = (message) => {
    return {
        type: 'REGISTER_SUCCESS',
        message
    }
}

export default function register(user){
    return async dispatch => {
        dispatch(index.fetchRequestStart());
        const res = await api.request("/home/register", user);
        dispatch(index.handleResponse(res, registerSuccess)); 
    }
}