import api from '../superagent/api';

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
    // TODO: Finish fetch cancelled
    return {
        type: 'HOME_DATA_FETCH_CANCELLED'
    }
}

export const fetchHomeData = () => dispatch => {
    return async dispatch => {
        dispatch(homeDataFetchRequest('REQUEST'));

        const data = await api.fetchData(`/home`);
        // TODO: Finish fetch home data
    }
}

// TODO: Finish process data
const processData = (data) => {
    if(data.length > 0){
        dispatch(homeDataFetchSuccess('SUCCESS', data))
    } else {

    }
}