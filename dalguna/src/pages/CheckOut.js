import React, { useState } from "react";
import RoomCard from "../components/RoomCard";

import '../checkout.css'

function CheckOut() {

    const [roomInfo, setRoomInfo] = useState([{
        name: "잇마이타이",
        timeLeft: 10,
        loc: "아름관",
        deliTime: "11~20",
        raised: 23000,
        minOrd: 20000,
      }])

      const [menuItemInfo, setMenuItemInfo]
      = useState([{
        name: "냉모밀+돈까스만", 
        detail: "면요리(선택)+돈까스단품(선택)",
        price: 13500,
      },
      {name: "냉모밀+돈까스만",
        detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
        price: 16000,},{
          name: "냉모밀+돈까스만", 
          detail: "면요리(선택)+돈까스단품(선택)",
          price: 13500
        }
      ])

      const room = roomInfo.map((room) =>
          <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>)

      const checkoutList = menuItemInfo.map((menu) => 
          <li key={menu.name} style={{listStyle:'none'}} className = "checkout_list_block">
            <span className="checkout_menu_name">{menu.name}</span>
            <span className="checkout_menu_price">{menu.price}</span>
          </li>
          
          )

      
    return (
        <div className="ui-container">
            <div className ="checkout_title__">
                Room #2
            </div>
            {room}
        <div classname="checkout_info_block">
            <div className="checkout_info_heading">
                <span className="estimated_time_arrival">ETA 18:32 PM</span>
                <span className="pickup_location">Pick up location</span>
            </div>
            <br/>
            <div className="checkout_info_content">
                <span className="estimated_time_arrival">50 mins</span>
                <span className="pickup_location">Areum Hall</span>
            </div>
        </div>
        <br/>
        <div>
            {checkoutList}
        </div>
        </div>
    )
}

export default CheckOut
