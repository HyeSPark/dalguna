import React from 'react'
import "../room_card.css"

function PriceGathered() {
    return (
        <div className="price-gathered-container">
            <span className ="gathered-text">₩10000 </span>
            <span className ="divider-text"> / </span>
            <span className ="min-order-text">₩15000</span>
        </div>
    )
}

export default PriceGathered
