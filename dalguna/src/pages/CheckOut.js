import React, { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import LongButton from "../components/LongButton";

import staticDB from "../db/static.json";
import { useParams, useNavigate } from "react-router-dom";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

import '../checkout.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';

function CheckOut() {

    // const [roomInfo, setRoomInfo] = useState([{
    //     name: "잇마이타이",
    //     timeLeft: 10,
    //     loc: "아름관",
    //     deliTime: "11~20",
    //     raised: 23000,
    //     minOrd: 20000,
    //   }])
    const navigate = useNavigate();
  const { userId, roomId } = useParams()

  const [menuItemInfo, setMenuItemInfo] = useState([]) // arr

  const [roomInfo, setRoomInfo] = useState({}); // obj from the docID

  const [checkOutList, setCheckOutList] = useState(<></>)

//   const [restInfo, setRestInfo] = useState(); // obj from the static db

  const [roomCard, setRoomCard] = useState(<></>)

  const [deliInfo, setDeliInfo] = useState({time:"0~0", addr:" " , expDeliTime:" ", deliFee:0, orgFee:""})

  const [totPrice, setTotPrice] = useState(0);

  const [orderNowButton, setOrderNowButton] = useState(<LongButton type="secondary">지금 시키고 싶어요!</LongButton>)

  const [orderNow, setOrderNow] = useState(<><span className = "checkout_orderNow-explain">최소 주문금액을 아직 넘지 못했어요</span>
  {orderNowButton}</>)


  function getRooms() {

    onSnapshot(collection(db, "rooms"), (snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => {
          if (doc.id === roomId) {
            tmp.push(doc.data())
          }
      })

      const roomInfoObj = tmp.map((room) => ({
        'roomId': room.id, 'restName': room.restName,
        'deliInfo': room.deliInfo, 'ordStat': room.ordStat,
        'parti': room.parti /*, 'entime': room.endTime*/
      }))[0]

      roomInfoObj['rest'] = staticDB.filter((el) => String(el.name) === String(roomInfoObj.restName))[0];

      setRoomInfo(roomInfoObj);
      console.log(roomInfoObj)

      setRoomCard(<div className="checkOut__roomCard">
            <RoomCard roomInfo={roomInfoObj} photo={false}></RoomCard>
        </div>)
      setMenuItemInfo(roomInfoObj.parti.filter((el) => String(el.id) === String(userId))[0].menu)
      
      const timeNow = new Date()
      var timeDeli = new Date() 
      timeDeli.setMinutes(timeNow.getMinutes() + Number(roomInfoObj['rest'].deliInfo.time.split('~')[0]))
      setDeliInfo({
          time: roomInfoObj['rest'].deliInfo.time,
          addr: roomInfoObj.deliInfo.addr,
          expDeliTime: `${timeDeli.getHours()}:${timeDeli.getMinutes()}`,
          deliFee: roomInfoObj['rest'].deliInfo.fee / roomInfoObj.parti.length,
          orgFee: roomInfoObj.parti.length !== 1 ? `${roomInfoObj['rest'].deliInfo.fee}` : "",
        })
      
    })
  }

  useEffect(() => {
    getRooms();
  }, []);


  useEffect(() => {
      if (roomInfo['parti'] !== undefined) {
          const poolMon = roomInfo.parti.reduce((prev, curr) => prev + curr.price, 0)
          
        
          if (roomInfo['rest'].deliInfo.minOrder < poolMon) {
            const numOrdNowPeople = roomInfo.parti.filter((el) => el.ordNow).length
            if (roomInfo['parti'].filter((el) => String(el.id) === String(userId))[0].ordNow) {
                setOrderNow(<><span className = "checkout_orderNow-explain">{numOrdNowPeople}명의 사람이 지금 시키고 싶어해요</span>
                <LongButton type="secondary">지금 시키고 싶어요!</LongButton>
                <span className = "checkout_orderNow-explain">버튼을 이미 눌렀어요</span></>)
            } else {
                setOrderNowButton(<LongButton onClick={plzOrderNow} type="primary">지금 시키고 싶어요!</LongButton>)
                setOrderNow(<><span className = "checkout_orderNow-explain">{numOrdNowPeople}명의 사람이 지금 시키고 싶어해요</span>
                {orderNowButton}</>)
            }
          }
      }
    
  }, [roomInfo, totPrice])
  
  useEffect(() => {
      setCheckOutList(menuItemInfo.map((menu, i) => 
            <li key={i} style={{listStyle:'none'}} className = "checkout_list_block">
                <span className="checkout_menu_name">{menu.name} x {menu.qnty}</span>
                <span className="checkout_menu_price">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                            .format(menu.price * menu.qnty)}</span>
            </li>))

    const totalPrice = [...menuItemInfo].reduce((prev, curr) => {
        console.log(curr.price)
        return(prev + curr.price * curr.qnty)
     } , deliInfo.deliFee)
    setTotPrice(totalPrice)
  }, [menuItemInfo, deliInfo])
    //   const room = roomInfo.map((room) =>
    //       <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>)
    

  function plzOrderNow() {
      console.log(userId)
      const numOrdNowPeople = roomInfo.parti.filter((el) => el.ordNow).length
      // 여기에서 디비 업로드
      setOrderNow(<><span className = "checkout_orderNow-explain">{numOrdNowPeople + 1}명의 사람이 지금 시키고 싶어해요</span>
            <LongButton type="secondary">지금 시키고 싶어요!</LongButton>
            <span className = "checkout_orderNow-explain">버튼을 이미 눌렀어요</span></>)
  }
    return (
        <div className="ui-container">
            <div className ="checkout_title__">
                <div className="checkout_title__goBack" onClick={() => navigate(-1)}><AiOutlineArrowLeft/></div>
                Your Room
            </div>
            {roomCard}
            <div className="checkout_info_block">
                <div className="checkout_info">
                    <div className="checkout_info-eta">
                        <span className="estimated_time_arrival checkout_info_heading">{deliInfo.expDeliTime} 도착 예정</span>
                        <span className="estimated_time_arrival checkout_info_content">{deliInfo.time} 분 후</span>
                    </div>
                </div>
                <br/>
                <div className="checkout_info-location">
                    <span className="pickup_location checkout_info_heading">Pick up location</span>
                    <span className="pickup_location checkout_info_content">{deliInfo.addr}</span>
                </div>
            </div>

            <div className = "mainPage__separation"/>
            <span className="checkout_info_content" style={{textAlign:"start", marginTop:"10px"}}>주문내역</span>
            <ul className="checkOut__orderList">
                {checkOutList}
                <li className="checkOut__deliFee">
                    <span className="checkout_menu_name">배달비</span>
                    <span className="checkout_menu_price">
                        <span className="checkout_menu_orgPrice">{deliInfo.orgFee}</span> 
                        <span style={{color:"rgba(0, 0, 0, 0.2)"}}>➡ </span> 
                        {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                            .format(deliInfo.deliFee)} </span>
                </li>
                <li className = "checkout_list_block">
                    <span className="checkout_menu_name" style={{fontWeight:"bold"}}>전체</span>
                    <span className="checkout_menu_price" style={{fontWeight:"bold"}}>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                            .format(totPrice)}</span>
                </li>
            </ul>
            <div className = "mainPage__separation"/>
            <div className = "checkout_orderNow">
                {orderNow}
            </div>
        </div>
    )
}

export default CheckOut
