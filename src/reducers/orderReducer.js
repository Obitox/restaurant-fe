import * as orderActions from '../actions/orderActions';

const initialState = {
    order: {},
    message: '',
    error: ''
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderActions.CREATE_ORDER_REQUEST:
            return Object.assign({}, state, {
                order: action.order
            }); 
        case orderActions.CREATE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                message: action.message
            }); 
        case orderActions.CREATE_ORDER_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });
        default:
            return state
    }
}