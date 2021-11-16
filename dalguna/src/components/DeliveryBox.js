import React, { useState } from 'react';
import '../delivery_box.css';
import { BiWalk } from 'react-icons/bi'

function DeliveryBox(props) {
    return (
        <div className={props.boxInfo.selected ? "delBox__" : "delBoxInactive__"}>
            <div className="delBox__name">{props.boxInfo.name}</div>
            <div className="delBox__time"><BiWalk/>{props.boxInfo.time} mins</div>
        </div>

    )
}

export default DeliveryBox