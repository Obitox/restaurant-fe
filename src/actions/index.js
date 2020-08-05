export const FETCH_REQUEST_START = 'FETCH_REQUEST_START';
export const FETCH_REQUEST_NO_DATA = 'FETCH_REQUEST_NO_DATA';
export const FETCH_REQUEST_ERROR = 'FETCH_REQUEST_ERROR';

export const fetchRequestStart = () => {
    return {
        type: 'FETCH_REQUEST_START'
    }
}

export const fetchRequestNoData = (message) => {
    return {
        type: 'FETCH_REQUEST_NO_DATA',
        message
    }
}

export const fetchRequestError = (error) => {
    return {
        type: 'FETCH_REQUEST_ERROR',
        error
    }
}

export function handleResponse(response, successFunc){
    return async dispatch => {
        if(response.error && response.status === 404)
            dispatch(fetchRequestError(response.error));
        else if(response.error)
            dispatch(fetchRequestError(response.error));
        else if(response.body.length === 0 || response.body === null || response.body === undefined)
            dispatch(fetchRequestNoData('NO DATA'));
        else if(response.body !== null && response.body !== undefined)
            dispatch(successFunc(response.body));
    }
}