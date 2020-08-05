import React from 'react'
import CartItem from './CartItem';

function CartItemList({ items, incrementAmount, decrementAmount, removeCartItem }) {
    return (
            items.map((item, index) => 
                    <CartItem key={index} item={item} index={index} incrementAmount={incrementAmount} decrementAmount={decrementAmount} removeCartItem={removeCartItem} />
            )
    );
}

export default CartItemList