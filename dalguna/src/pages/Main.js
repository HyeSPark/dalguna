import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { collection, onSnapshot, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";

import RoomCard from '../components/RoomCard';
import CatFilter from './CatFilter';
import CatItem from '../components/CatItem';
import RestCard from '../components/RestCard.js'
import NavBar from '../components/NavBar.js'
import TabBar from '../components/TabBar.js'
import CartModal from "../components/CartModal";

import staticDB from "../db/id402_restuarants.json";
import dhspic from '../img/DHS_photo.jpeg';
import junggukjib from '../img/000_cat.jpg';
import teopbab from '../img/008_cat.jpg';
import dosirak from '../img/005_cat.jpg';
import ilsik from '../img/002_cat.jpg';
import salad from '../img/006_cat.jpg';
import yangsik from '../img/003_cat.jpg';
import hansik from '../img/001_cat.jpg';
import bunsik from '../img/014.jpg';



import "../main.css";

function Main() {
  const [deliAddr, setDeliAddr] = useState("");
  const restInfo = staticDB;
  const [roomInfo, setRoomInfo] = useState([]);
  const [isUserParticipants, setIsUserParticipants] = useState(false);
  const catInfoList = [
    {name: "한식", img:hansik}, 
    {name: "일식", img:ilsik},
    {name: "분식", img:bunsik},
    {name: "양식", img:yangsik},
    {name: "샐러드", img:salad},
    {name: "도시락", img:dosirak},
    {name: "중국집", img:junggukjib},
    {name: "덮밥", img:teopbab},
  ]

  const stringToTime = (str) => {
    const [hour, minute] = str.split(':').map((el) => parseInt(el));
    return hour * 60 + minute;
  }
  const restList = restInfo.filter((rest) => {
    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
    return stringToTime(rest.open) <= nowTime && nowTime <= stringToTime(rest.close);
  }).map((rest, i) => 
  <li key={i} style={{listStyle:'none'}}>
     <Link to={`./restaurant/${rest.id}`}><RestCard restInfo={rest} roomInfo={roomInfo}></RestCard></Link>
  </li>)

  const catList = catInfoList.map((cat, i) => 
      <li key={i} style={{listStyle:'none'}}>
        <Link to={{
          pathname:`./filter/${cat.name}`}}> <CatItem img={cat.img} name={cat.name}></CatItem> </Link>
      </li>
  )
  
  const [myRoomCard, setMyRoomCard] = useState(<></>);
  const [otherRoomList, setOtherRoomList] = useState(<></>);
  
  const { userId } = useParams();
  const navigate = useNavigate();

  function getRooms() {
    onSnapshot(collection(db, "rooms"), (snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => tmp.push({room_id: doc.id, room: doc.data()}))
      setRoomInfo(tmp.map(({room, room_id}) => {
        const roomInfoObj = {
          'roomId': room_id, 'restName': room.restName,
          'addr': room.addr, 'ordStat': room.ordStat,
          'parti': room.parti, 'endTime': room.endTime,
          'timeLeft': parseInt((room.endTime.seconds - new Date().getTime() / 1000) / 60),
          'rest': restInfo.filter((rest) => rest.name == room.restName)[0],
          'poolMon': room.parti.reduce((money, menu) => money + menu.price, 0) 
        }
        if (room.parti.filter((el) => el.id === userId).length !== 0 && room.ordStat < 3) {
          setMyRoomCard(<Link to={{pathname:`./${room_id}`}}> <RoomCard roomInfo={roomInfoObj} photo={true}></RoomCard></Link>)
          setOtherRoomList(<></>)
          setIsUserParticipants(true);
        } else {
          updateDoc(doc(db, "users", userId), {
            paid: false
          })
        }
        return roomInfoObj}));
      updateDoc(doc(db, "users", userId), {
        curRoomId: ""
      })
    })

    getDoc(doc(db, "users", userId)).then((user)=> {
      if (user.data() !== undefined) {
        const { addr } = user.data()
        if (addr === "" || addr === undefined) {
          setDeliAddr("배달장소 선택")
        } else {
          setDeliAddr(addr)
        }
      } else {
        navigate("../")
      }
    })
  }

  useEffect(() => {
    getRooms();

  }, []);

  function handleRoomEnter(roomId, restName) {
    updateDoc(doc(db, "users", userId), {
      curRoomId: roomId
    })
    const restId = restInfo.filter(({name}) => name === restName)[0].id
    if (window.confirm("먼저 배달음식을 담아주세요")) {
      navigate(`./restaurant/${restId}`)
    }
    console.log(roomId)
  }

  useEffect(() => {
    if (isUserParticipants) {
      setMyRoomCard(roomInfo.filter((el) => el.parti.filter((user) => user.id === userId).length !== 0)
        .map((room, i) => <Link key={i} to={{pathname:`./${room.roomId}`}}> <RoomCard roomInfo={room} photo={true}></RoomCard></Link>))
      
    }
    else {
      console.log(roomInfo, )
      setMyRoomCard(<div className="mainPage__noYourRoom">아직 참여하신 방이 없습니다.</div>)
      setOtherRoomList(<>
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Room Suggestions</div>
        <ul style={{margin:0}} className = "mainPage__room-list">
          
            {roomInfo.filter((el) => el.addr === deliAddr 
                && el.parti.filter((user) => user.id === userId).length === 0
                && el.ordStat == 0 ).map((room, i) => 
            <li key={i} style={{listStyle:'none'}}>
                <div onClick={() => handleRoomEnter(room.roomId, room.restName)}> <RoomCard roomInfo={room} photo={true}></RoomCard></div>
            </li>)}
            {deliAddr === "" || deliAddr === "배달장소 선택" ? <div className="mainPage__noYourRoom">사용 전 배달장소를 선택해주세요</div> : null}
        </ul></>
      )
    }

  }, [roomInfo, isUserParticipants, deliAddr])
  
  useEffect(() => {
    if (deliAddr !== "배달장소 선택" && deliAddr !== "") {
      updateDoc(doc(db, "users", userId), {
        addr: deliAddr
      })
    }
  }, [deliAddr])
  
  // [Not Solved] 근데 my room 이 생긴 상태의 사람은 suggestion 없애야할듯
  // for (const room of roomInfo) {
  //   room['rest'] = restInfo.filter((rest) => rest.name == room.restName)[0];
  // }


  return (
    <div className="ui-container">
      <div className="mainPage__">
        <NavBar deliAddr={deliAddr} setDeliAddr={setDeliAddr}/>
        <div style={{height:"105px"}}/>
        <div className = "mainPage__title">Food Categories</div>
        <ul className = "mainPage__cat-list">
            {catList}
        </ul>
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Your Room</div>
        <div className = "mainPage__room-list">
            {myRoomCard}
        </div>
        {otherRoomList}
        <div className = "mainPage__separation"/>
        <div className = "mainPage__title">Restaurant List</div>
        <ul style={{margin:0}} className = "mainPage__rest-card-list">
            {restList.length === 0 ? <div className="mainPage__noYourRoom">현재 주문 가능한 식당이 없습니다.</div> 
              : restList}
        </ul>
        {/* <TabBar/> */}
      </div>
    </div>
      
  )
}

export default Main;