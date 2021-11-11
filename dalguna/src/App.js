
import dhspic from './img/DHS_photo.jpeg';
import React, { useState } from 'react';
import './App.css';
import RestaurantCard from './components/RestaurantCard.js'
import NavBar from './components/NavBar.js'
import TabBar from './components/TabBar.js'
import CartButton from './components/CartButton.js'
import RestTitleBox from './components/RestTitleBox.js'
import RoomCard from './components/RoomCard';


function App() {
  // restInfo contains all information about the all restaurant with JSON Type
  // restRoom array will be changing actively
  // [NOT DECIDED] 통으로 전달 or 따로따로 전달?
  const [restInfo, setRestInfo] 
    = useState([{name:"대학생 치킨", minOrder:"₩15,000", 
        deliFee: "₩3,000", deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}]
      }])
  const [cartItem, setCartItem] 
    = useState({restName:"대학생 치킨", items:["몬스터 오븐 구이"]})
  
  // mapping the list
  const restList = restInfo.map((rest) => 
    <li key={rest.name} style={{listStyle:'none'}}>
      <a href="#"><RestaurantCard restInfo={rest}></RestaurantCard></a>
    </li>)
  
  // cart visible
  const isVisible = true;
  const objVisible 
  = {true: "",
      false: "hide"}
  
  return (
    <div className="App">
      <NavBar></NavBar>
      <RestTitleBox restName="대학생 치킨" restRating="5.0 (100)"></RestTitleBox>
      <ul style={{margin:0}} className = "mainPage__rest-card-list">
        {restList}
      </ul>
      <RoomCard></RoomCard>
      <div className={objVisible[isVisible]}>
        <CartButton cartItem={cartItem}></CartButton>
      </div>
      <TabBar></TabBar>
    </div>
  );
}

export default App;
