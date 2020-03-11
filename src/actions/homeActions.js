import * as api from '../superagent/api';

export const HOME_DATA_FETCH_REQUEST = 'HOME_DATA_FETCH_REQUEST ';
export const HOME_DATA_FETCH_SUCCESS = 'HOME_DATA_FETCH_SUCCESS';
export const HOME_DATA_FETCH_NO_DATA = 'HOME_DATA_FETCH_NO_DATA ';
export const HOME_DATA_FETCH_ERROR = 'HOME_DATA_FETCH_ERROR';
export const HOME_DATA_FETCH_CANCELLED = 'HOME_DATA_FETCH_CANCELLED';

const homeDataFetchRequest = (status) => {
   return {
       type: 'HOME_DATA_FETCH_REQUEST',
       status
   } 
}

const homeDataFetchSuccess = (status, data) => {
    return {
        type: 'HOME_DATA_FETCH_SUCCESS',
        payload: {
            status,
            data
        }
    }
}

const homeDataFetchNoData = (status) => {
    return {
        type: 'HOME_DATA_FETCH_NO_DATA',
        status
    }
}

const homeDataFetchError = (status) => {
    return {
        type: 'HOME_DATA_FETCH_ERROR',
        status
    }
}

const homeDataFetchCancelled = (status) => {
    return {
        type: 'HOME_DATA_FETCH_CANCELLED',
        status
    }
}

export function fetchHomeData(){
    return async dispatch => {
        dispatch(homeDataFetchRequest('REQUEST'));
        
        const response = await api.fetchData(`/home`);
        dispatch(processResponse(response));
    }
}

function processResponse(response){
    return async dispatch => {
        if(response.error && response.status === 404)
            dispatch(homeDataFetchError('ERROR'));
        else if(response.error)
            dispatch(homeDataFetchError('ERROR'));
        else if(response.body.length === 0)
            dispatch(homeDataFetchNoData('NO DATA')); 
        else if(response.body.length > 0)
            dispatch(homeDataFetchSuccess('SUCCESS', response.body));
    }
}