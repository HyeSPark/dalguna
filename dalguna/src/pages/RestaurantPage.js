import React, { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom'

import RestTitleBox from '../components/RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from '../components/MenuListItem';
import RestTab from '../components/RestTab.js';
import TabBar from '../components/TabBar.js';
import CartButton from '../components/CartButton.js';
import MenuModal from '../components/MenuModal.js';

import staticDB from "../db/static.json";
import '../rest-page.css'

function RestaurantPage() {
  const params = useParams();
  const arrRestName = ["대학생 치킨", "베리신주쿠", "마쯔미"];

  const [restInfo, setRestInfo] = useState(staticDB[params.restId])
  const [menuItemInfo, setMenuItemInfo]
  // = useState([{
  //   id: 0,
  //   name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
  //   detail: "면요리(선택)+돈까스단품(선택)",
  //   price: 13500,
  //   img: dhspic
  // },{
  //   id: 1,
  //   name: "돈까스정식+냉모밀 세트",
  //   detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
  //   price: 16000,
  //   img: dhspic,} 
  // ])
  = useState(restInfo.menu)
  
  const [modal, setModal] = useState(<></>)
  function openMenuModal(menu) {
    setModal(<MenuModal menuInfo={menu} restName={restInfo.name} setModal={setModal}></MenuModal>)
  }

  const menuList = menuItemInfo.map((menu) => 
  <li key={menu.id} style={{listStyle:'none'}} className = "mainPage__menu-item">
    <a href="#" onClick={() => openMenuModal(menu)}> <MenuListItem menuItemInfo={menu}></MenuListItem></a>
  </li>
  )

  const info = 
    <div className = "restPage__info">
      <p className = "restPage__info-text">{restInfo.info}</p>
      <div className = "restPage__info-opening">
        <p>Open at {restInfo.open}</p>
        <p>Close at {restInfo.close}</p>
      </div>
    </div>
  
  const roomList = <div></div>

  const [curTab, setCurTab] = useState("menu");
  const curTabContent = {
    "menu": menuList,
    "info": info,
    "room": roomList
  }

  const [cartItem, setCartItem] 
  = useState({restName:"대학생 치킨", items:["몬스터 오븐 구이"]})

    return (
        <div className="ui-container">
            {modal}
            <div className="rest-title-image" style={{backgroundImage: `url(${dhspic})`}}>
                <RestTitleBox restName={restInfo.name} restRating="5.0 (100)"></RestTitleBox>   
            </div>
            <RestTab curTab = {curTab} setCurTab = {setCurTab}/>
            {curTabContent[curTab]}
            <CartButton cartItem={cartItem}/>
            <TabBar/>
        </div>
    )
}

export default RestaurantPage
