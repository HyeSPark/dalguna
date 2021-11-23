import React, { useState } from 'react';
import '../cart_button.css';
import { BsCart2 } from 'react-icons/bs'

function CartButton(props) {
    const len = props.cartItem.length

    return (
        <button onClick={props.onClick} className="cartButton__">
            <div className="cartButton__cart-icon">
                <BsCart2></BsCart2>
            </div>
            {len !== 0 ? <div className="cartButton__item-len"><span>{len}</span></div> 
                : null}
            
        </button>
    )
}

export default CartButton