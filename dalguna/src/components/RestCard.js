import React, { useState, useEffect } from 'react'
import '../restaurant_card.css';
import { AiOutlineUser } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"

function RestCard(props) {
    // var roomKey = 0

    ///// room tag list is not solved
    const [roomTagList, setRoomTagList] = useState(<></>)
    // const [roomListForRest, setRoomListForRest] = useState(props.roomInfo.filter((el) => el.restName === props.restInfo.name))
    const isPrimaryTag = {
        true: "restCard__tag-primary",
        false: "restCard__tag-secondary",
    }
    useEffect( updateRoomTagList , [props.roomInfo])
    function updateRoomTagList() {
        const filteredRoom = props.roomInfo.filter((el) => el.restName === props.restInfo.name && el.ordStat === 0);
        if (filteredRoom.length === 0) setRoomTagList ( <span>참여 가능한 방이 없습니다.</span> )
        else {
            setRoomTagList( filteredRoom.map(({parti, poolMon, rest, timeLeft}, i) =>
                <li key={i} className={`restCard__room-tag ${isPrimaryTag[poolMon >= rest.deliInfo.minOrder]}`}>
                    <AiOutlineUser className="restCard__secondary" style={{verticalAlign:"-5%"}}/> {parti.length} 
                    <span className="restCard__secondary"> 주문</span> {timeLeft}<span className="restCard__secondary">분 전</span>
                </li>
            ))
        }
        
    }

    
    
    ////////
    const minOrd = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.restInfo.deliInfo.minOrder)
    
    const deliFee = 
        new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.restInfo.deliInfo.fee)
    // 일단은 room list 가 너무 길어지면 담줄로 넘어가게 만듦
    // .. 으로 표시하는게 나을까? 
    return (
        <div className="restCard__">
            <div><img className="restCard__img" src={props.restInfo.photo}></img></div>
            <div className= "restCard__container">
                <div className="restCard__name-deli-time">
                    <div className="restCard__name">{props.restInfo.name}</div>
                    <div className="restCard__deli-time">
                        <FaMotorcycle className="restCard__secondary" style={{verticalAlign:"-5%"}}/> {props.restInfo.deliInfo.time} 
                        <span className="restCard__secondary"> min</span>
                    </div>
                </div>
                <div className="restCard__min-order-deli-fee">
                    <span className="restCard__secondary">Min. order</span> {minOrd} 
                    <span className="restCard__secondary"> Delivery fee</span> {deliFee}
                </div>
                {/* <ul className="restCard__room-tag-list">
                    
                </ul> */}
                
                <ul className="restCard__room-tag-list">
                    {roomTagList}
                </ul>
            </div>
        </div>
    )
}
export default RestCard