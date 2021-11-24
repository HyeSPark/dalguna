import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import RestTitleBox from '../components/RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from '../components/MenuListItem';
import RestTab from '../components/RestTab.js';
import TabBar from '../components/TabBar.js';
import CartButton from '../components/CartButton.js';
import MenuModal from '../components/MenuModal.js';
import CartModal from '../components/CartModal.js';

import staticDB from "../db/static.json";
import '../rest-page.css'
import { AiOutlineArrowLeft } from "react-icons/ai";

function RestaurantPage() {
  const params = useParams();
  const navigate = useNavigate();
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
    setModal(<MenuModal menuInfo={menu} restName={restInfo.name} setModal={setModal} cartItem={cartItem} setCartItem={setCartItem}></MenuModal>)
  }

  const [cartItem, setCartItem] 
  = useState([])
  function openCartModal() {
    setModal(<CartModal restName={restInfo.name} menuList={cartItem} setMenuList={setCartItem} setModal={setModal}></CartModal>)
  }

  

  const menuList = menuItemInfo.map((menu) => 
  <li key={menu.id} style={{listStyle:'none'}} className = "mainPage__menu-item">
    <a onClick={() => openMenuModal(menu)}> <MenuListItem menuItemInfo={menu}></MenuListItem></a>
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


    return (
        <div className="ui-container">
            <TabBar/>
            {modal}
            <div className="rest-title-image" style={{backgroundImage: `url(${dhspic})`}}>
                <a href="#" className="rest-title-back" onClick={() => navigate(-1)}>
                    <AiOutlineArrowLeft /> 
                </a>
                <RestTitleBox restName={restInfo.name} restRating="5.0 (100)"></RestTitleBox>   
            </div>
            <RestTab curTab = {curTab} setCurTab = {setCurTab}/>
            {curTabContent[curTab]}
            <CartButton cartItem={cartItem} onClick={openCartModal}/>
        </div>
    )
}

export default RestaurantPage
