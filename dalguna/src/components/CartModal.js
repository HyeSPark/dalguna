import React from "react"
import { CgClose } from 'react-icons/cg';

import "../cart_modal.css"

function CartModal() {
    const deliveryAdrs = "아름관"

    return (
        <div className="CartModal__">
            <div className="CartModal__bar">
                <a href="#" className="CartModal__bar-close"><CgClose></CgClose></a>
                <span className="CartModal__bar-cart">Cart</span>
            </div>
            <div className="CartModal__address">
                <div><span>Delivery to </span><span style={{fontWeight:"bold"}}>{deliveryAdrs}</span></div>
                <a href="#" className="CartModal__address-edit">Edit</a>
            </div>
            <div className = "mainPage__separation"/>
            <div className="CartModal__restmenu">

            </div>
            <div className="CartModal__request">

            </div>
            <div className="CartModal__rooms">

            </div>
        </div>
    )
}

export default CartModal;