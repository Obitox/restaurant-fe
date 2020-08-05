import * as loginActions from '../actions/loginActions';

const initialState = {
    username: '',
    auth: {},
    error: '' 
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case loginActions.LOGIN_REQUEST:
            return Object.assign({}, state, {
                username: action.username
            });
        case loginActions.LOGIN_SUCCESS:
            console.log(action.auth);
            
            return Object.assign({}, state, {
                auth: action.auth
            });
        case loginActions.LOGIN_FAILED:
            return Object.assign({}, state, {
                error: action.err
            });
        case 'SET_AUTH':
            return Object.assign({}, state, {
                auth: action.auth
            });
        default:
            return state;
    }
}