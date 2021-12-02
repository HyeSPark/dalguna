import React, { useState, useEffect } from "react"
import { CgClose } from 'react-icons/cg';
import CartMenuItem from "./CartMenuItem";
import RoomCard from "./RoomCard";
import LongButton from "./LongButton";

import { useParams, useNavigate } from "react-router-dom";

import { collection, onSnapshot, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

import NewRoomModal from "./NewRoomModal"

import "../cart_modal.css"

function CartModal(props) {
    const params = useParams()
    const navigate = useNavigate()
    
    const { restName, menuList, setMenuList, setModal, roomList, roomInfo, roomIdUserJoining, deliAddr } = props
    // let roomInfo = []; 
    // if (roomInfoTmp != undefined) roomInfo = roomInfoTmp.filter((el) => el.ordStat == 0);
    const roomLength = roomInfo.length
    
    // const createButtonClassName = { true: "" ,
    //         false: "cartModal__createHide" }

    const [createButton, setCreateButton] = useState(<></>)

    const [roomListClickable, setRoomListClickable] = useState(<></>)

    const [updatedRealMenuList, setUpdatedRealMenuList] = useState(menuList)

    // useEffect(()=> {
    //     if (roomIdUserJoining === "") {
    //         setCreateButton(<div className="CartModal__create-room">
    //             <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>원하는 방을 찾지 못하셨나요?</span>
    //             <LongButton onClick={openNewRoomModal} type="primary">새로운 방 만들기</LongButton>
    //         </div>)
    //     } else {
    //         setCreateButton(<div className="CartModal__create-room">
    //             <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>선택한 방에서 같이 주문할까요?</span>
    //             <LongButton onClick={() => enterExistingRoom(roomIdUserJoining)} type="primary">모임에 합류하기</LongButton>
    //         </div>)
    //     }

    // }, [roomIdUserJoining])

    // useEffect(updateRoomListClickable, [roomInfo]);
    // function updateRoomListClickable() {
    //     setRoomListClickable(roomInfo.filter((room) => room.restName==restName)
    //     .map((room, i) => 
    //     <li key={i} style={{listStyle:'none'}}>
    //         <div onClick={() => enterExistingRoom(room.roomId)}> <RoomCard roomInfo={room} photo={true}></RoomCard></div>
    //     </li>))

    //     if (roomInfo.filter((room) => room.restName==restName).length === 0) {
    //         setRoomListClickable(<p>만들어진 방이 없습니다.</p>)
    //     }
    // }
    

    const [menuVisible, setMenuVisible] 
        = useState(menuList.map((menu, i) => 
            <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
    
    function goBack() {
        setModal(<></>)
    }

    useEffect(updateCartMenu, [menuList, roomIdUserJoining, roomInfo]) 
    
    function updateCartMenu() {
        console.log(params.userId, menuList)
        var copied = [...menuList]
           
        setMenuVisible(copied.map((menu, i) =>
                <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
        
        if (menuList.length === 0) {
            setCreateButton(<div className="CartModal__create-room">
                <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>카트가 비어있습니다.</span>
                <LongButton type="secondary">주문하기</LongButton>
            </div>)

            setRoomListClickable(roomInfo.filter((room) => room.restName==restName)
                .map((room, i) => 
                <li key={i} style={{listStyle:'none'}}>
                    <div onClick={() => window.alert("카트가 비었습니다.")}> <RoomCard roomInfo={room} photo={true}></RoomCard></div>
                </li>))
        } else {
            if (roomIdUserJoining === "") {
                setCreateButton(<div className="CartModal__create-room">
                    <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>원하는 방을 찾지 못하셨나요?</span>
                    <LongButton onClick={openNewRoomModal} type="primary">새로운 방 만들기</LongButton>
                </div>)
            } else {
                setCreateButton(<div className="CartModal__create-room">
                    <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>선택한 방에서 같이 주문할까요?</span>
                    <LongButton onClick={() => enterExistingRoom(roomIdUserJoining)} type="primary">모임에 합류하기</LongButton>
                </div>)
            }
            console.log(roomInfo)
            setRoomListClickable(roomInfo.filter((room) => room.restName==restName)
                .map((room, i) => 
                    <li key={i} style={{listStyle:'none'}}>
                        <div onClick={() => enterExistingRoom(room.roomId)}> <RoomCard roomInfo={room} photo={true}></RoomCard></div>
                    </li>))
        }
        if (roomInfo.filter((room) => room.restName==restName).length === 0) {
            setRoomListClickable(<p>만들어진 방이 없습니다.</p>)
        }
    }

    const [newRoomModal, setNewRoomModal] = useState(<></>)

    function openNewRoomModal() {
        console.log(menuList)
        setNewRoomModal(<div className="new-modal-container" onClick={closeNewRoomModal}><NewRoomModal restName={restName} menuList={menuList} deliAddr={deliAddr}/></div>)
    }

    const closeNewRoomModal = (e) => {
        var contactHeight = e.clientY;
        var windowHeight = window.innerHeight;
        if (windowHeight - contactHeight > 255) {
            setNewRoomModal(<></>)
        }
    }

    function enterExistingRoom(roomId) {
        if (window.confirm("주문할까요?") ) {
            if (menuList.length === 0) {
                window.alert("카트가 비어있습니다.")
            } else {
                getDoc(doc(db, "rooms", roomId)).then((room) => {
                    const { parti } = room.data();
                    const updatedParti = [...parti, {
                        "id": params.userId,
                        "menu": menuList, 
                        "ordNow": false,
                        "price": menuList.reduce((price, menu) => price + menu.price * menu.qnty, 0)
                    }]
                    updateDoc(doc(db, "rooms", roomId), {
                        parti: updatedParti,
                    })
                    navigate(`../${params.userId}`)
                }
                )
            }
        }
    } 


    return (
        <div className="CartModal__" style={{backgroundColor:"white", height:"100%"}}>
            <div className="CartModal__bar">
                <button onClick={goBack} className="CartModal__bar-close"><CgClose></CgClose></button>
                <span className="CartModal__bar-cart">Cart</span>
            </div>
            <div className="CartModal__address">
                <div><span>Delivery to </span><span style={{fontWeight:"bold"}}>{deliAddr}</span></div>
                <a href="#" className="CartModal__address-edit">Edit</a>
            </div>
            <div className = "mainPage__separation"/>
            <div className="CartModal__restmenu">
                <div className="CartModal__title">{restName}</div>
                { menuVisible }
                <button className="CartModal__restmenu-add" onClick={goBack}>+ Add More Menu</button>
            </div>
            <div className = "mainPage__separation"/>
            {/* <div className="CartModal__request">
            </div>
            <div className = "mainPage__separation"/> */}
            <div className ="CartModal__room">
                <div className="CartModal__title">
                    Rooms Available
                </div>
                <ul style={{padding:0}} className = "CartModal__room-list">
                    {roomLength !== 0 ? roomListClickable : <p style={{color:"grey"}}> 현재 가능한 방이 없습니다. </p> }
                </ul>
            </div>
            <div className = "mainPage__separation"/>
            {createButton}
            {newRoomModal}
        </div>
    )
}

export default CartModal;