import React from 'react'
import CartMeal from './CartMeal';

function CartMealList({ meals, incrementAmount, decrementAmount, removeCartMeal }) {
    return (
            meals.map((meal, index) => 
                    <CartMeal key={index} meal={meal} index={index} incrementAmount={incrementAmount} decrementAmount={decrementAmount} removeCartMeal={removeCartMeal} />
            )
    );
}

export default CartMealList
