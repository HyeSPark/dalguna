import React from 'react'
import '../room_card.css';
import {FaMapMarkerAlt,FaMotorcycle} from "react-icons/fa";
import dhspic from '../img/DHS_photo.jpeg';
import Timer from './Timer';
import PriceGathered from './PriceGathered';

//not yet passed any props
function RoomCard(props) {
    return (
        <div className ="roomCard">
                <div ClassName ="roomCardInfo">
                    <div className ="titleRow">
                        <span className="title"> 대학생 치킨 </span>
                         <Timer/>
                    </div>
                    <div className ="infoRow">
                        {/* <span className="location"> TITLE HERE </span> */}
                        <FaMapMarkerAlt className="roomCardSecondary" style={{verticalAlign:"-5%"}}/> 아름관
                        &nbsp;
                        <FaMotorcycle className="roomCardSecondary" style={{verticalAlign:"-5%"}}/> 21~30 mins
                        {/* <span className="deliveryTime"> TIMER HERE</span> */}
                    </div>
                    <div className ="priceGathered">
                        <span><PriceGathered/></span>
                    </div>
                </div>
                
                <img className="roomCardImg" src={dhspic}/>
            </div>
    )
}

export default RoomCard
