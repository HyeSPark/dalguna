import React from 'react'
import '../room_card.css';
import { db } from "../firebase-config.js";
import { updateDoc, doc } from 'firebase/firestore';

function RoomTimer(props) {
    if (props.roomInfo.ordStat == 0 && props.roomInfo.timeLeft < 0) {
        updateDoc(doc(db, "rooms", props.roomInfo.roomId), {
            ordStat: 1
        })
    }
    // [NOT DECIDED] 분기점을 각 component 안에다 뒀음
    const isEmergency = 0 <= props.roomInfo.timeLeft && props.roomInfo.timeLeft < 6;
    const classNameObj = {
        true: "roomTimer__ roomTimer__danger",
        false: "roomTimer__ roomTimer__secondary"
    }
    let sent;
    switch (props.roomInfo.ordStat) {
        case 0 : sent = props.roomInfo.timeLeft + " min left"; break;
        case 1 : sent = "Ordered"; break;
        case 2 : sent = "Paid"; break;
        case 3 : sent = "Delivered"; break;
    }
    return (
        <div className={classNameObj[isEmergency]}>
            <span className ="roomTimer__text">{sent}</span>
        </div>
    )
}

export default RoomTimer
