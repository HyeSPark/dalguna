import React, { useState, useEffect } from "react"
import { CgClose } from 'react-icons/cg';
import CartMenuItem from "./CartMenuItem";
import RoomCard from "./RoomCard";
import LongButton from "./LongButton";
import { useParams } from "react-router-dom";
import NewRoomModal from "./NewRoomModal"

import "../cart_modal.css"

function CartModal(props) {
    const params = useParams()
    
    const { restName, menuList, setMenuList, setModal, setVisible } = props
    const [roomInfo, setRoomInfo] = useState([{
        name: "대학생 치킨",
        timeLeft: 15,
        loc: "아름관",
        deliTime: "21~30",
        raised: 10000,
        minOrd: 15000,
      }, {
        name: "마쯔미",
        timeLeft: 13,
        loc: "아름관",
        deliTime: "31~40",
        raised: 9000,
        minOrd: 13000,
      }, {
        name: "잇마이타이",
        timeLeft: 10,
        loc: "아름관",
        deliTime: "11~20",
        raised: 23000,
        minOrd: 20000,
      }])
    const deliveryAdrs = "Areum Hall"
    // const [menuList, setMenuList] = useState([{
    //     name: "맛있는 돈까스",
    //     qnty: 1,
    //     detail: ["데리야끼 소스로 변경", "양 추가"],
    //     price: 10000,
    // }])

    const [menuVisible, setMenuVisible] 
        = useState(menuList.map((menu, i) => 
            <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
    
    useEffect(updateCartMenu, [menuList]) 
    function goBack() {
        setModal(<></>)
        // setVisible("restPage")
    }
    function updateCartMenu() {
        console.log(params.userId, menuList)
        /////// not solvedddddd
        // if (menuList[0] === undefined) {setMenuVisible(<CartMenuItem menuDetail={menuList[0]} setMenuDetail={setMenuList}/>)}
        // if (menuList[0] !== undefined) {
            var copied = [...menuList]
            // console.log(copied.filter((el)=> el.qnty !== 0))
            setMenuVisible(copied.filter((el)=> el.qnty !== 0)
                .map((menu, i) =>
                    <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
        // }
        // else if (menuList[0]["qnty"] !== 0) {setMenuVisible(<CartMenuItem menuDetail={menuList[0]} setMenuDetail={setMenuList}/>)}
        // else {setMenuVisible()}
    }

    const [newRoomModal, setNewRoomModal] = useState(<></>)

    function openNewRoomModal() {
        setNewRoomModal(<div className="new-modal-container" onClick={closeNewRoomModal}><NewRoomModal restName={restName} menuList={menuList}/></div>)
    }

    const closeNewRoomModal = (e) => {
        var contactHeight = e.clientY;
        var windowHeight = window.innerHeight;
        if (windowHeight - contactHeight > 255) {
            setNewRoomModal(<></>)
        }
        
        // 
    }

    const roomList = roomInfo
                        .filter((room) => room.name==restName)
                        .map((room, i) => 
                                <li key={i} style={{listStyle:'none'}}>
                                    <a href="#"> <RoomCard roomInfo={room}></RoomCard></a>
                                </li>)

    return (
        <div className="CartModal__" style={{backgroundColor:"white", height:"100%"}}>
            <div className="CartModal__bar">
                <button onClick={goBack} className="CartModal__bar-close"><CgClose></CgClose></button>
                <span className="CartModal__bar-cart">Cart</span>
            </div>
            <div className="CartModal__address">
                <div><span>Delivery to </span><span style={{fontWeight:"bold"}}>{deliveryAdrs}</span></div>
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
                    {roomList}
                    {roomInfo.length !== 0 ? <p style={{color:"grey"}}> 현재 가능한 방이 없습니다. </p> : null}
                </ul>
            </div>
            <div className = "mainPage__separation"/>
            <div className="CartModal__create-room">
                <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>Didn’t find a room suitable for you?</span>
                <LongButton onClick={openNewRoomModal} type="primary">Create your own room</LongButton>
            </div>
            {newRoomModal}
        </div>
    )
}

export default CartModal;