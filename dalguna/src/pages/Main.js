import React, { useState } from "react";
import { Link } from "react-router-dom";

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


function Main() {

    // const [restInfo, setRestInfo] = useState([{
    //     name:"대학생 치킨", minOrder:15000, 
    //     deliFee: 3000, deliTime: "27~31", img: dhspic,
    //     rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
    //     category: "Chicken"
    //   },{
    //     name:"베리신주쿠", minOrder:15000, 
    //     deliFee: 3000, deliTime: "27~31", img: dhspic,
    //     rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
    //     category: "Japanese"
    //   },{
    //     name:"마쯔미", minOrder:15000, 
    //     deliFee: 3000, deliTime: "27~31", img: dhspic,
    //     rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
    //     category: "Japanese"
    //   }])
    const [restInfo, setRestInfo] = useState(staticDB);

    const [roomInfo, setRoomInfo] = useState([{
        name: "대학생 치킨",
        timeLeft: 15,
        loc: "아름관",
        deliTime: "21~30",
        raised: 10000,
        minOrd: 15000,
      }, {
        name: "마쯔미",
        timeLeft: 13,
        loc: "아름관",
        deliTime: "31~40",
        raised: 9000,
        minOrd: 13000,
      }, {
        name: "잇마이타이",
        timeLeft: 10,
        loc: "아름관",
        deliTime: "11~20",
        raised: 23000,
        minOrd: 20000,
      }])

    
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
    <li key={rest.name} style={{listStyle:'none'}}>
      <Link to={{pathname: `/restaurant/${rest.id}`}}><RestCard restInfo={rest}></RestCard></Link>
    </li>)

      // [NOT IMPLEMENTED] key will be changed below (room name is not unique)
    const roomList = roomInfo.map((room) => 
    <li key={room.name} style={{listStyle:'none'}}>
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