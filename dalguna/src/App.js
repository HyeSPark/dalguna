import logo from './logo.svg';
import dhspic from './img/DHS_photo.jpeg';
import React, { useState } from 'react';
import './App.css';
import RestaurantCard from './components/RestaurantCard.js'
import NavBar from './components/NavBar.js'
import TabBar from './components/TabBar.js'

function App() {
  // restInfo contains all information about the all restaurant with JSON Type
  // restRoom array will be changing actively
  // [NOT DECIDED] 통으로 전달 or 따로따로 전달?
  const [restInfo, setRestInfo] 
    = useState([{name:"대학생 치킨", minOrder:"₩15,000", 
        deliFee: "₩3,000", deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}]
      }])
  
  const restList = restInfo.map((rest) => 
    <li style={{listStyle:'none'}}>
      <a><RestaurantCard restInfo={rest}></RestaurantCard></a>
    </li>)

  return (
    <div className="App">
      <NavBar></NavBar>
      <ul style={{margin:0}} className = "mainPage__rest-card-list">
        {restList}
      </ul>
      <TabBar></TabBar>
    </div>
  );
}

export default App;
