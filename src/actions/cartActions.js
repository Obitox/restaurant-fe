export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const MODIFY_IN_CART = 'MODIFY_IN_CART';

export const addItemToCart = item => {
    return {
        type: 'ADD_ITEM_TO_CART',
        item
    }
}

export const addMealToCart = meal => {
    return {
        type: 'ADD_MEAL_TO_CART',
        meal
    }
}

const removeFromCart = itemId => {
    return {
        type: 'REMOVE_FROM_CART',
        itemId
    }
} 

const modifyInCart = cart => {
    return {
        type: 'MODIFY_IN_CART',
        cart
    }
} 

export function updateExistingCartItemAmount(cart, basePortion, cartItem, index, amount){
   return dispatch => {
        if(cartItem.amount > 0){
            console.log(basePortion);
            console.log(cartItem);
            cartItem.amount += amount;
            cartItem.portion.price += basePortion.price * amount;
            cartItem.portion.calorieCount += basePortion.calorieCount * amount;
            cartItem.portion.mass += basePortion.mass * amount;
            cart.items[index] = cartItem;
            dispatch(modifyInCart(cart));
        }
    }
}

export function updateExistingCartMealAmount(cart, baseMeal, meal, index, amount){
    return dispatch => {
        if(meal.amount > 0){
            console.log(baseMeal.price);
            console.log(amount);
            meal.amount += amount;
            meal.price += baseMeal.price * amount;
            cart.meals[index] = meal;
            dispatch(modifyInCart(cart));
        }
    }
}