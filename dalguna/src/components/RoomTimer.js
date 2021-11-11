import React from 'react'
import '../room_card.css';
function RoomTimer(props) {
    // [NOT DECIDED] 분기점을 각 component 안에다 뒀음
    const isEmergency = props.timeLeft < 6;
    const classNameObj = {
        true: "roomTimer__ roomTimer__danger",
        false: "roomTimer__ roomTimer__secondary"
    }
    return (
        <div className={classNameObj[isEmergency]}>
            <span className ="roomTimer__text">{props.timeLeft} min left</span>
        </div>
    )
}

export default RoomTimer
