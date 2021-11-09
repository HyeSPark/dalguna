import React, { useState } from 'react';
import '../cart_button.css';
import { BsCart2 } from 'react-icons/bs'

function CartButton(props) {
    const len = props.cartItem.items.length

    return (
        <a href="#" className="cartButton__">
            <div className="cartButton__cart-icon">
                <BsCart2></BsCart2>
            </div>
            <div className="cartButton__item-len">
                <span>{len}</span>
            </div>
        </a>
    )
}

export default CartButton