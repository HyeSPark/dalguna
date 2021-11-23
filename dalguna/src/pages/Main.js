import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config.js";

import RoomCard from '../components/RoomCard';
import CatFilter from './CatFilter';
import CatItem from '../components/CatItem';
import RestCard from '../components/RestCard.js'
import NavBar from '../components/NavBar.js'
import TabBar from '../components/TabBar.js'
import CartModal from "../components/CartModal";

import staticDB from "../db/static.json";
import dhspic from '../img/DHS_photo.jpeg';

import "../main.css";

function getDB(restInfo, setRestInfo, roomInfo, setRoomInfo) {
  getDocs(collection(db, 'STATIC')).then((snapshot) => {
    const tmp = [];
    snapshot.forEach((doc) => tmp.push(doc.data()))
    setRestInfo(tmp.map((rest) => ({
      'restName': rest.restName, 'minOrd': rest.minOrd,
      'deliFee': rest.deliFee, 'category' : rest.category,
      'deliTime': rest.deliTime['min']+'~'+rest.deliTime['max'],
      'rooms': [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
      'img': dhspic
    })))
  }).then(getDocs(collection(db, 'DYNAMIC')).then((snapshot) => {
    const tmp = [];
    snapshot.forEach((doc) => tmp.push(doc.data()))
    setRoomInfo(tmp.map((room) => ({
      'restName': room.restName, 'deliLoc': room.deliLoc,
      'poolMon': room.poolMon, 'endTime': room.endTime,
      'ordStat': room.ordStat, 'participants': room.participants,
      'roomId': room.roomID,
      'timeLeft': 15
    })))
  })).then(() => {
    console.log(restInfo);
  })
}

function Main() {
  // const [restInfo, setRestInfo] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [restInfo, setRestInfo] = useState(staticDB);
  // getDB(restInfo, setRestInfo, roomInfo, setRoomInfo);

  for (const room of roomInfo) {
    room['minOrd'] = restInfo.filter((rest) => rest.restName == room.restName)['minOrd']
  }

  const catInfoList = [
      {name: "Korean", img:dhspic}, 
      {name: "Chicken", img:dhspic},
      {name: "Japanese", img:dhspic},
      {name: "Snacks", img:dhspic},
      {name: "Asian", img:dhspic},
      {name: "Salad", img:dhspic},
      {name: "Doshirak", img:dhspic},
      {name: "중국집", img:dhspic},
      {name: "덮밥", img:dhspic},
  ]

  const restList = restInfo.map((rest) => 
  <li key={rest.restName} style={{listStyle:'none'}}>
     <Link to={{pathname: `/restaurant/${rest.id}`}}><RestCard restInfo={rest}></RestCard></Link>
  </li>)

    // [NOT IMPLEMENTED] key will be changed below (room name is not unique)
  const roomList = roomInfo.map((room) => 
  <li key={room.roomName} style={{listStyle:'none'}}>
      <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>
  </li>
  )

  const catList = catInfoList.map((cat) => 
      <li key={cat.name} style={{listStyle:'none'}}>
        <Link to={{
          pathname:`/filter/${cat.name}`}}> <CatItem img={cat.img} name={cat.name}></CatItem> </Link>
      </li>
  )

  return (
    <div className="ui-container">
      <div className="mainPage__">
        <NavBar/>
        <div style={{height:"105px"}}/>
        <div className = "mainPage__title">Food Categories</div>
        <ul className = "mainPage__cat-list">
            {catList}
        </ul>
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Your Room</div>
        <ul style={{margin:0}} className = "mainPage__room-list">
            {roomList[2]}
        </ul>
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Room Suggestions</div>
        <ul style={{margin:0}} className = "mainPage__room-list">
            {roomList.slice(0, 2)}
        </ul>
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Restaurant List</div>
        <ul style={{margin:0}} className = "mainPage__rest-card-list">
            {restList}
        </ul>
        <TabBar/>
      </div>
    </div>
      
  )
}

export default Main;