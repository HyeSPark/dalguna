import React from 'react'
import '../room_card.css';
import {FaMapMarkerAlt,FaMotorcycle} from "react-icons/fa";
import dhspic from '../img/DHS_photo.jpeg';
import RoomTimer from './RoomTimer.js';
import RoomPriceRaised from './RoomPriceRaised.js';

// [NOT DECIDED] price raised?
// [SOLVED] not yet passed any props
function RoomCard(props) {
    return (
        <div className ="roomCard__">
                <div className ="roomCard__info">
                    <div className ="roomCard__info-title">
                        <span className="roomCard__info-title-name"> {props.roomInfo.name} </span>
                         <RoomTimer timeLeft={props.roomInfo.timeLeft}/>
                    </div>
                    <div className ="roomCard__info-deli">
                        <span className ="roomCard__info-deli-loc">
                            <FaMapMarkerAlt className="roomCard__info-deli-icon" style={{verticalAlign:"-5%"}}/> {props.roomInfo.loc}
                        </span>
                        <span className ="roomCard__info-deli-deliTime">
                            <FaMotorcycle className="roomCard__info-deli-icon" style={{verticalAlign:"-5%"}}/> {props.roomInfo.deliTime} mins
                        </span>
                    </div>
                    <div className ="roomCard__info-price">
                        <span><RoomPriceRaised raised={props.roomInfo.raised} minOrd={props.roomInfo.minOrd}/></span>
                    </div>
                </div>
                
                <img className="roomCard__img" src={dhspic}/>
            </div>
    )
}

export default RoomCard
