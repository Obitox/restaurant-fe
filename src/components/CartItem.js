import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import TextField from '@material-ui/core/TextField';

import '../styles/cartItem.scss';

function CartItem({ item, index, incrementAmount, decrementAmount, removeCartItem }) {
    return (
        <div className="cart-item-container">
            <p>{item.id}</p> 
            <p>{item.title}</p> 
            <p>{item.amount}</p>
            <FontAwesomeIcon icon={faPlusSquare} size="1x" onClick={ () => incrementAmount(index, item) } />
            <FontAwesomeIcon icon={faMinusSquare} size="1x" onClick={ () => decrementAmount(index, item)} />
            <FontAwesomeIcon icon={faTrashAlt} size="1x" onClick={ () => removeCartItem(index) }/>
            <TextField
                id="outlined-textarea"
                label="Dodatna uputstva"
                placeholder=""
                multiline
                variant="outlined"
                value={item.personalPreference}
            />
        </div>
    )
}

export default CartItem
