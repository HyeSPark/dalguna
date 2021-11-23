import React, { useState } from 'react'
import '../restaurant_card.css';
import { AiOutlineUser } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"

function RestCard(props) {
    var roomKey = 0

    // ///// room tag list is not solved
    // const roomTagList = props.restInfo.rooms.map(function({part, order}) {
    //         roomKey += 1;
    //         return (<li key={roomKey} className="restCard__room-tag">
    //             <AiOutlineUser className="restCard__secondary" style={{verticalAlign:"-5%"}}/> {part} 
    //             <span className="restCard__secondary"> until</span> {order}
    //         </li>)
    //         }
    //     )
    // ////////

    const minOrd = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.restInfo.minOrd)
    
    const deliFee = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.restInfo.deliFee)
    // 일단은 room list 가 너무 길어지면 담줄로 넘어가게 만듦
    // .. 으로 표시하는게 나을까? 
    return (
        <div className="restCard__">
            <div><img className="restCard__img" src={props.restInfo.img}></img></div>
            <div className= "restCard__container">
                <div className="restCard__name-deli-time">
                    <div className="restCard__name">{props.restInfo.restName}</div>
                    <div className="restCard__deli-time">
                        <FaMotorcycle className="restCard__secondary" style={{verticalAlign:"-5%"}}/> {props.restInfo.deliTime} 
                        <span className="restCard__secondary"> min</span>
                    </div>
                </div>
                <div className="restCard__min-order-deli-fee">
                    <span className="restCard__secondary">Min. order</span> {minOrd} 
                    <span className="restCard__secondary"> Delivery fee</span> {deliFee}
                </div>
                {/* <ul className="restCard__room-tag-list">
                    {roomTagList}
                </ul> */}
            </div>
        </div>
    )
}
export default RestCard