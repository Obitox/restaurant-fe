import * as homeActions from '../actions/homeActions';
import * as indexActions from '../actions/index';

const initialState = {
    status: '',
    data: [],
    profile: {},
    error: '',
    message: '',
    categories: [],
    meals: [],
    portions: [],
    ingredients: [],
    theme: 'light'
}

export const homeReducer = (state = initialState, action) => {
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
        case homeActions.GET_PROFILE:
            return Object.assign({}, state, {
                profile: action.data
            });
        case homeActions.SET_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories
            });
        case homeActions.SET_MEALS:
            return Object.assign({}, state, {
                meals: action.meals
            });
        case homeActions.SET_PORTIONS:
            return Object.assign({}, state, {
                portions: action.portions
            });
        case homeActions.SET_INGREDIENTS:
            return Object.assign({}, state, {
                ingredients: action.ingredients
            });
        case homeActions.CHANGE_THEME:
            return Object.assign({}, state, {
                theme: action.theme
            });
        case indexActions.FETCH_REQUEST_START:
            return state;
        case indexActions.FETCH_REQUEST_NO_DATA:
            return Object.assign({}, state, {
                message: action.message
            }); 
        case indexActions.FETCH_REQUEST_ERROR:
            return Object.assign({}, state, {
                error: action.error
            }); 
        default:
            return state;
    }
}