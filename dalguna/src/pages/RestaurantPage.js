import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import RestTitleBox from '../components/RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from '../components/MenuListItem';
import RestTab from '../components/RestTab.js';
import TabBar from '../components/TabBar.js';
import CartButton from '../components/CartButton.js';
import MenuModal from '../components/MenuModal.js';
import CartModal from '../components/CartModal.js';
import RoomCard from '../components/RoomCard.js';

import staticDB from "../db/static.json";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

import '../rest-page.css'
import { AiOutlineArrowLeft } from "react-icons/ai";

function RestaurantPage() {
  const params = useParams();
  const { userId, restId } = params;
  const navigate = useNavigate();
  // const arrRestName = ["대학생 치킨", "베리신주쿠", "마쯔미"];

  const [roomIdUserJoining, setRoomIdUserJoining] = useState("");
  const [classNameRestPage, setClassNameRestPage] = useState("restPage");
  const [deliAddr, setDeliAddr] = useState("");

  const [restInfo, setRestInfo] = useState(staticDB[params.restId])
  const [menuItemInfo, setMenuItemInfo] = useState(restInfo.menu)
  
  const [modal, setModal] = useState(<></>)

  function openMenuModal(menu) {
    setModal(<MenuModal menuInfo={menu} restName={restInfo.name} setModal={setModal} cartItem={cartItem} setCartItem={setCartItem} ></MenuModal>)
  }
  
  function handleCartItemUpdate() {
    if (document.getElementsByClassName("restPage")[0].previousSibling !== null 
      && document.getElementsByClassName("restPage")[0].previousSibling.className === "CartModal__") {
      setModal(<CartModal restName={restInfo.name} menuList={cartItem} setMenuList={setCartItem} setModal={setModal} 
            roomList={roomList} roomLength={roomInfo.length} 
            roomIdUserJoining={roomIdUserJoining} deliAddr={deliAddr}></CartModal>)
    }
      
  }
  
  const [cartItem, setCartItem] 
    = useState([])
  useEffect(handleCartItemUpdate, [cartItem])
  
  function openCartModal() {
    setModal(<CartModal restName={restInfo.name} menuList={cartItem} setMenuList={setCartItem} setModal={setModal} 
          roomList={roomList} roomLength={roomInfo.length} 
          roomIdUserJoining={roomIdUserJoining} deliAddr={deliAddr}></CartModal>)
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
  

  const [roomInfo, setRoomInfo] = useState([]);

  function getRooms() {
    getDoc(doc(db, "users", userId)).then((user) => {
      setDeliAddr(user.data().addr)

      if (user.data().curRoomId !== "") {
        setRoomIdUserJoining(user.data().curRoomId)
        getDoc(doc(db, "rooms", user.data().curRoomId)).then((room) => {
          const { restName, deliInfo, ordStat, parti, endTime } = room.data();
          setRoomInfo([{
            'roomId': user.data().curRoomId, 'restName': restName,
            'deliInfo': deliInfo, 'ordStat': ordStat,
            'parti': parti, 'endTime': endTime,
            'timeLeft': parseInt((endTime.seconds - new Date().getTime() / 1000) / 60),
            'rest': restInfo,
            'poolMon': parti.reduce((money, menu) => money + menu.price, 0) 
          }])
        })
      } else {
        onSnapshot(collection(db, "rooms"), (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => tmp.push(doc.data()))
          setRoomInfo(tmp.map((room) => ({
            'roomId': room.id, 'restName': room.restName,
            'deliInfo': room.deliInfo, 'ordStat': room.ordStat,
            'parti': room.parti, 'endTime': room.endTime,
            'timeLeft': parseInt((room.endTime.seconds - new Date().getTime() / 1000) / 60),
            'rest': restInfo,
            'poolMon': room.parti.reduce((money, menu) => money + menu.price, 0) 
          })));
        })
      }
    })
  }

  useEffect(() => {
    getRooms();
  }, []);

  // for (const room of roomInfo) {
  //     room['rest'] = restInfo;
  // }

  const [roomList, setRoomList] = useState(<></>)
  useEffect(() => {

      setRoomList(roomInfo.filter((room) => room.restName==restInfo.name)
      .map((room, i) => 
      <li key={i} style={{listStyle:'none'}}>
          <div> <RoomCard roomInfo={room} photo={true}></RoomCard></div>
      </li>))
      if (roomInfo.length === 0) {
        setRoomList(<p>만들어진 방이 없습니다.</p>)
      }
  }, [roomInfo]);

  

  const [curTab, setCurTab] = useState("menu");
  const curTabContent = {
    "menu": menuList,
    "info": info,
    "room": roomList
  }

  function goBack() {
    if (cartItem.length != 0) {
      if (window.confirm("카트가 비워집니다. 뒤로 가시겠습니까?")) {
        navigate(-1)
      }
    } else {
      navigate(-1)
    }
  }


    return (
        <div className="ui-container">
          {modal}
          <div className={classNameRestPage}>
            {/* <TabBar/> */}
            
            <div className="rest-title-image" style={{backgroundImage: `url(${restInfo.photo})`}}>
              <div className="rest-title">
                <button className="rest-title-back" onClick={goBack}>
                    <AiOutlineArrowLeft /> 
                </button>
                <div></div>
              </div>
                
                <RestTitleBox restName={restInfo.name} restRating="5.0 (100)"></RestTitleBox>   
            </div>
            <RestTab curTab = {curTab} setCurTab = {setCurTab}/>
            <ul className="restPage__content-list">
              {curTabContent[curTab]}
            </ul>
            <CartButton cartItem={cartItem} onClick={openCartModal}/>
          </div>
        </div>
    )
    }


export default RestaurantPage
