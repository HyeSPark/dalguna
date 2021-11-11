import React from 'react'
import "../room_card.css"

function RoomPriceRaised(props) {
    const raised = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.raised)
    const minOrd = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.minOrd)
    
    const isAvailable = props.raised > props.minOrd;
    const classNameObj = {
        true: "roomPriceRaised__ roomPriceRaised__primary",
        false: "roomPriceRaised__ roomPriceRaised__secondary"
    }
    return (
        <div className={classNameObj[isAvailable]}>
            <span className ="roomPriceRaised__raised">{raised} </span>
            <span className ="roomPriceRaised__divider"> / </span>
            <span className ="roomPriceRaised__minOrd">{minOrd}</span>
        </div>
    )
}

export default RoomPriceRaised
