import * as api from '../superagent/api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const createOrderRequest = (order) => {
    return {
        type: 'CREATE_ORDER_REQUEST',
        // id,
        order
    };
}

export const createOrderSuccess = (message) => {
   return {
       type: 'CREATE_ORDER_SUCCESS',
       message
   } 
}

export const createOrderError = (error) => {
   return {
       type: 'CREATE_ORDER_ERROR',
       error
   } 
}

export function orderRequest(order) {
    return async dispatch => {
        dispatch(createOrderRequest(order));
        const res = await api.request('/order', order);
        dispatch(processResponse(res));
    };
}

// Possibly not gonna get called
const processResponse = response => {
    return async dispatch => {
        if(response.error && response.status === 404)
            dispatch(createOrderError('ERROR'));
        else if(response.error)
            dispatch(createOrderError('ERROR'));
        // else if(response.body.length === 0)
        //     dispatch(homeDataFetchNoData('NO DATA')); 
        else if(response.body.length > 0)
            dispatch(createOrderSuccess('SUCCESS', response.body));
    }
}