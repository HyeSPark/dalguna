
import dhspic from './img/DHS_photo.jpeg';
import React, { useState } from 'react';
import './App.css';
import RestCard from './components/RestCard.js'
import NavBar from './components/NavBar.js'
import TabBar from './components/TabBar.js'
import ShortButton from './components/ShortButton';
import LongButton from './components/LongButton';
import CartButton from './components/CartButton.js'
import RestTitleBox from './components/RestTitleBox.js'
import RestTab from './components/RestTab.js'
import MenuListItem from './components/MenuListItem';
import RoomCard from './components/RoomCard';
import CatFilterPage from './pages/CatFilterPage'


function App() {
  // restInfo contains all information about the all restaurant with JSON Type
  // restRoom array will be changing actively
  // [NOT DECIDED] 통으로 전달 or 따로따로 전달?

  // [SOLVED] scroll!!!
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
      }])
  const [cartItem, setCartItem] 
    = useState({restName:"대학생 치킨", items:["몬스터 오븐 구이"]})

  const [menuItemInfo, setMenuItemInfo]
    = useState([{
      name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
      detail: "면요리(선택)+돈까스단품(선택)",
      price: 13500,
      img: dhspic
    },
    // {name: "돈까스정식+냉모밀 세트",
    //   detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
    //   price: "₩16,000",
    //   img: dhspic,} 
    ])
  const [roomInfo, setRoomInfo] = 
    useState([{
      name: "대학생 치킨",
      timeLeft: 15,
      loc: "아름관",
      deliTime: "21~30",
      raised: 10000,
      minOrd: 15000,
    }])
  
  // mapping the list
  const restList = restInfo.map((rest) => 
    <li key={rest.name} style={{listStyle:'none'}}>
      <a href="#"><RestCard restInfo={rest}></RestCard></a>
    </li>)

  const menuList = menuItemInfo.map((menu) => 
    <li key={menu.name} style={{listStyle:'none'}} className = "mainPage__menu-item">
      <a href="#"> <MenuListItem menuItemInfo={menu}></MenuListItem></a>
    </li>
  )
  // [NOT IMPLEMENTED] key will be changed below (not unique)
  const roomList = roomInfo.map((room) => 
  <li key={room.name} style={{listStyle:'none'}}>
    <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>
  </li>
)

  
  // cart visible
  const isVisible = false;
  const objVisible 
  = {true: "",
      false: "hide"}
  
  return (
    <div className="App">
      <div className="mainPage__">
        <NavBar></NavBar>
        <RestTitleBox restName="대학생 치킨" restRating="5.0 (100)"></RestTitleBox>
        <ul style={{margin:0}} className = "mainPage__rest-card-list">
          {restList}
        </ul>
        <ul style={{margin:0}} className = "mainPage__room-list">
          {roomList}
        </ul>
        <RestTab></RestTab>
        <ul style={{margin:0}} className = "mainPage__menu-item-list">
          {menuList}
        </ul>
        <LongButton type="secondary">Button</LongButton>
        <div className = "mainPage__buttons">
          <ShortButton type="primary">Button</ShortButton>
          <ShortButton type="secondary">Button</ShortButton>
        </div>
      </div>
      <div className={objVisible[isVisible]}>
        <CartButton cartItem={cartItem}></CartButton>
      </div>
      <CatFilterPage/>
      {/* <TabBar></TabBar> */}
    </div>
  );
}

export default App;
