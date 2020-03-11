import * as homeActions from '../actions/homeActions';

const initialState = {
    status: '',
    data: [],
}

export default function homeReducer(state = initialState, action){
    switch(action.type){
        case homeActions.HOME_DATA_FETCH_REQUEST:
            return Object.assign({}, state, {
                status: action.status
            });
        case homeActions.HOME_DATA_FETCH_SUCCESS:
            return Object.assign({}, state, {
                status: action.payload.status,
                data: action.payload.data
            });
        case homeActions.HOME_DATA_FETCH_ERROR:
            return Object.assign({}, state, {
                status: action.status
            });
        default:
            return state;
    }
}