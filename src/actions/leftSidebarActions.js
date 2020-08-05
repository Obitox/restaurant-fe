import * as index from './index';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        categories
    }
} 

export default function fetchCategories(){
    return async dispatch => {
        const request = {
            request: async () => 
            {
                dispatch(index.fetchRequestStart());
                const res = await api.request(`/home/categories`);
                dispatch(index.handleResponse(res, setCategories));
            }
        };
        dispatch(request);
    }
} 