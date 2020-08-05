import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import '../styles/cartMeal.scss';

function CartMeal({ meal, index, incrementAmount, decrementAmount, removeCartMeal }) {
    return (
        <div className="cart-meal-container">
           <p>{meal.mealId}</p> 
           <p>{meal.title}</p> 
           <p>{meal.amount}</p>
           <FontAwesomeIcon icon={faPlusSquare} size="1x" onClick={() => incrementAmount(index, meal)} />
           <FontAwesomeIcon icon={faMinusSquare} size="1x" onClick={() => decrementAmount(index, meal)} />
           <FontAwesomeIcon icon={faTrashAlt} size="1x" onClick={() => removeCartMeal(index) } />
        </div>
    )
}

export default CartMeal
