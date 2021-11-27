import React, { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";

import staticDB from "../db/static.json";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

import '../checkout.css'

function CheckOut() {

    // const [roomInfo, setRoomInfo] = useState([{
    //     name: "잇마이타이",
    //     timeLeft: 10,
    //     loc: "아름관",
    //     deliTime: "11~20",
    //     raised: 23000,
    //     minOrd: 20000,
    //   }])

  const { userId, roomId } = useParams()

  const [menuItemInfo, setMenuItemInfo] = useState([]) // arr

  const [roomInfo, setRoomInfo] = useState(); // obj from the docID

  const [checkOutList, setCheckOutList] = useState(<></>)

  const [restInfo, setRestInfo] = useState(); // obj from the static db

  const [roomCard, setRoomCard] = useState(<></>)


  function getRooms() {

    onSnapshot(collection(db, "rooms"), (snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => {
          if (doc.id === roomId) {
            tmp.push(doc.data())
          }
      })

      const roomInfoObj = tmp.map((room) => ({
        'roomId': room.id, 'restName': room.restName,
        'deliInfo': room.deliInfo, 'ordStat': room.ordStat,
        'parti': room.parti /*, 'entime': room.endTime*/
      }))[0]

      roomInfoObj['rest'] = staticDB.filter((el) => String(el.name) === String(roomInfoObj.restName))[0];

      setRoomInfo(roomInfoObj);
      console.log(roomInfoObj)

      setRoomCard(<div>
            <a href="#"> <RoomCard roomInfo={roomInfoObj} photo={false}></RoomCard></a>
        </div>)
      setMenuItemInfo(roomInfoObj.parti.filter((el) => String(el.id) === String(userId))[0].menu)
      
    })
  }

  useEffect(() => {
    getRooms();
  }, []);

  
  useEffect(() => {
      setCheckOutList(menuItemInfo.map((menu) => 
            <li key={menu.name} style={{listStyle:'none'}} className = "checkout_list_block">
            <span className="checkout_menu_name">{menu.name}</span>
            <span className="checkout_menu_price">{menu.price}</span>
        </li>))
    
  }, [menuItemInfo])
    //   const room = roomInfo.map((room) =>
    //       <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>)



      
    return (
        <div className="ui-container">
            <div className ="checkout_title__">
                Room #2
            </div>
            {roomCard}
        <div className="checkout_info_block">
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
            {checkOutList}
        </div>
        </div>
    )
}

export default CheckOut
