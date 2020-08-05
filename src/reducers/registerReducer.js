import * as registerActions from '../actions/registerActions';

const initialState = {
    message: ''
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerActions.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                message: action.message
            });
        default:
            return state
    }
}