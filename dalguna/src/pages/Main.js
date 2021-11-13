import React, { useState } from "react";

import RoomCard from '../components/RoomCard';
// import CatFilterPage from './pages/CatFilterPage';
import CatItem from '../components/CatItem';
import RestCard from '../components/RestCard.js'
import NavBar from '../components/NavBar.js'
import TabBar from '../components/TabBar.js'

import dhspic from '../img/DHS_photo.jpeg';

import "../main.css";


function Main() {

    const [restInfo, setRestInfo] 
    = useState([{
        name:"대학생 치킨", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Chicken"
      },{
        name:"우동", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Japanese"
      },{
        name:"우동1", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Japanese"
      }])

    const [roomInfo, setRoomInfo] = 
      useState([{
        name: "대학생 치킨",
        timeLeft: 15,
        loc: "아름관",
        deliTime: "21~30",
        raised: 10000,
        minOrd: 15000,
      }])

    const catNameList = ["Korean", "Chicken", "Japanese", "Snacks", "Asian", "Salad", "Doshirak"]
    const catInfoList = [
        {name: "Korean", img: dhspic}, 
        {name: "Chicken", img:dhspic},
        {name: "Japanese", img:dhspic},
        {name: "Snacks", img:dhspic},
        {name: "Asian", img:dhspic},
        {name: "Salad", img:dhspic},
    ]

    const restList = restInfo.map((rest) => 
    <li key={rest.name} style={{listStyle:'none'}}>
      <a href="#"><RestCard restInfo={rest}></RestCard></a>
    </li>)

      // [NOT IMPLEMENTED] key will be changed below (not unique)
    const roomList = roomInfo.map((room) => 
    <li key={room.name} style={{listStyle:'none'}}>
        <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>
    </li>
    )
    const catList = catInfoList.map((cat) => 
        <li key={cat.name} style={{listStyle:'none'}}>
        <a href="#"> <CatItem img={cat.img} name={cat.name}></CatItem> </a>
        </li>
    )

    return (
        <div className="mainPage__">
            
            <NavBar></NavBar>
            <ul className = "mainPage__cat-list">
                {catList}
            </ul>
            <ul style={{margin:0}} className = "mainPage__rest-card-list">
                {restList}
            </ul>
            <ul style={{margin:0}} className = "mainPage__room-list">
                {roomList}
            </ul>
            {/* <RestTab></RestTab>
            <ul style={{margin:0}} className = "mainPage__menu-item-list">
            {menuList}
            </ul> */}
            {/* <LongButton type="secondary">Button</LongButton>
            <div className = "mainPage__buttons">
            <ShortButton type="primary">Button</ShortButton>
            <ShortButton type="secondary">Button</ShortButton>
            </div> */}
            <TabBar></TabBar>
      </div>
    )
}

export default Main;