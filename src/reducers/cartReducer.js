import * as cartActions from '../actions/cartActions';

const initialState = {
    cart: {
        items: [],
        meals: []
    },
    price: 0
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActions.ADD_ITEM_TO_CART:
            return Object.assign({}, state, {
                cart: { items: [...state.cart.items, action.item], meals: state.cart.meals || [] }
            });
        case cartActions.ADD_MEAL_TO_CART:
            return Object.assign({}, state, {
                cart: { items: state.cart.items || [], meals: [...state.cart.meals, action.meal] }
            });
        case cartActions.MODIFY_IN_CART:
            return Object.assign({}, state, {
                cart: action.cart || {}
            });
        case 'REMOVE_CART_ITEM':
            return Object.assign({}, state, {
                cart: { 
                    items: [
                        ...state.cart.items.slice(0, action.index),
                        ...state.cart.items.slice(action.index + 1)
                    ],
                    meals: state.cart.meals || []
                } 
            });
        case 'REMOVE_CART_MEAL':
            return Object.assign({}, state, {
                cart: { 
                    items: state.cart.items || [],
                    meals: [
                        ...state.cart.meals.slice(0, action.index),
                        ...state.cart.meals.slice(action.index + 1)
                    ]
                } 
            });
        case 'SET_PRICE':
            return Object.assign({}, state, {
                price: action.price
            });
        default:
            return state
    }
}