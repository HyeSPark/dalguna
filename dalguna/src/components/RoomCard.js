import React from 'react'
import '../room_card.css';
import {FaMapMarkerAlt,FaMotorcycle} from "react-icons/fa";
import dhspic from '../img/DHS_photo.jpeg';
import RoomTimer from './RoomTimer.js';
import RoomPriceRaised from './RoomPriceRaised.js';
import { AiOutlineUser } from "react-icons/ai"


// [NOT DECIDED] price raised?
// [SOLVED] not yet passed any props
function RoomCard(props) {
    console.log(props.roomInfo.rest.photo)
    return (
        <div className ="roomCard__">
                <div className ="roomCard__info">
                    <div className ="roomCard__info-title">
                        <span className="roomCard__info-title-name"> {props.roomInfo.restName} </span>
                        <RoomTimer timeLeft={props.roomInfo.timeLeft}/>
                    </div>
                    <div className ="roomCard__info-deli">
                        <span className ="roomCard__info-deli-loc">
                            <FaMapMarkerAlt className="roomCard__info-deli-icon" style={{verticalAlign:"-5%"}}/> {props.roomInfo.deliInfo.addr}
                        </span>
                        <span className ="roomCard__info-deli-deliTime">
                            <FaMotorcycle className="roomCard__info-deli-icon" style={{verticalAlign:"-5%"}}/> {props.roomInfo.rest.deliInfo.time} mins
                        </span>
                    </div>
                    <div className ="roomCard__info-price">
                        <span><RoomPriceRaised raised={props.roomInfo.deliInfo.poolMon} minOrd={props.roomInfo.rest.deliInfo.minOrder}/></span>
                    </div>
                </div>
                
                <div className="roomCard__img" style={{backgroundImage:`url(${props.roomInfo.rest.photo})`}}>
                    <span className="roomCard__members"><AiOutlineUser style={{verticalAlign:"-10%"}}/> {props.roomInfo.parti.length}</span>
                </div>
            </div>
    )
}

export default RoomCard
