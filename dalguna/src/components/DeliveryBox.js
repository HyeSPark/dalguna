import React, { useState } from 'react';
import '../delivery_box.css';
import { BiWalk } from 'react-icons/bi'

function DeliveryBox(props) {
    const focusClassName = {true: "delBox__", false: "delBoxInactive__"}

    return (
        <div className={focusClassName[props.boxInfo.selected]}>
            <div className={focusClassName[props.boxInfo.selected]+"name"}>{props.boxInfo.name}</div>
            {/* <div className={focusClassName[props.boxInfo.selected]+"time"}><BiWalk/>{props.boxInfo.time} mins</div> */}
        </div>

    )
}

export default DeliveryBox