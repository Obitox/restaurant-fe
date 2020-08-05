import * as api from '../superagent/api';
import * as index from './index';

export const HOME_DATA_FETCH_REQUEST = 'HOME_DATA_FETCH_REQUEST';
export const HOME_DATA_FETCH_SUCCESS = 'HOME_DATA_FETCH_SUCCESS';
export const HOME_DATA_FETCH_NO_DATA = 'HOME_DATA_FETCH_NO_DATA';
export const HOME_DATA_FETCH_ERROR = 'HOME_DATA_FETCH_ERROR';
export const HOME_DATA_FETCH_CANCELLED = 'HOME_DATA_FETCH_CANCELLED';

export const GET_PROFILE = 'GET_PROFILE';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_MEALS = 'SET_MEALS';
export const SET_PORTIONS = 'SET_PORTIONS';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const CHANGE_THEME = 'CHANGE_THEME';

const setCategories = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        categories
    }
} 

const setMeals = (meals) => {
    return {
        type: 'SET_MEALS',
        meals
    }
}

const setPortions = (portions) => {
    return {
        type: 'SET_PORTIONS',
        portions
    }
}

const setIngredients = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients
    }
}

export const homeDataFetchRequest = (status) => {
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

export const changeTheme = (theme) => {
    return {
        type: 'CHANGE_THEME',
        theme
    }
}

export const homeDataFetchCancelled = (status) => {
    return {
        type: 'HOME_DATA_FETCH_CANCELLED',
        status
    }
}

export const getProfile = (data) => {
    return {
        type: 'GET_PROFILE',
        data
    }
}

export function fetchHomeData(){
    return async dispatch => {
        const response = await api.fetchData(`/home`);
        dispatch(processResponse(response));
    }
}

export function profile(){
    return async dispatch => {
        const request = {
            request: async (auth) => 
            {
                dispatch(index.fetchRequestStart());
                const res = await api.authRequest(`/account/profile`, {}, auth);
                dispatch(index.handleResponse(res, getProfile));
            }
        };
        dispatch(request);
  }
}

export function fetchCategories(){
    return async dispatch => {
        dispatch(index.fetchRequestStart());
        const res = await api.request(`/home/categories`);
        dispatch(index.handleResponse(res, setCategories));
    }
}

export function fetchMeals(){
    return async dispatch => {
        dispatch(index.fetchRequestStart());
        const res = await api.request(`/home/meals`);
        dispatch(index.handleResponse(res, setMeals));
    }
}

export function fetchPortions(){
    return async dispatch => {
        dispatch(index.fetchRequestStart());
        const res = await api.request(`/home/portions`);
        dispatch(index.handleResponse(res, setPortions));
    }
}

export function fetchIngredients(){
    return async dispatch => {
        dispatch(index.fetchRequestStart());
        const res = await api.request(`/home/ingredients`);
        dispatch(index.handleResponse(res, setIngredients));
    }
}

export function processResponse(response){
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

