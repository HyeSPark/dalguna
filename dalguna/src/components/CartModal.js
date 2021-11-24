import React, { useState, useEffect } from "react"
import { CgClose } from 'react-icons/cg';
import CartMenuItem from "./CartMenuItem";
import RoomCard from "./RoomCard";
import LongButton from "./LongButton";

import "../cart_modal.css"

function CartModal(props) {
    const { restName, menuList, setMenuList, setModal } = props
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
    const deliveryAdrs = "아름관"
    // const [menuList, setMenuList] = useState([{
    //     name: "맛있는 돈까스",
    //     qnty: 1,
    //     detail: ["데리야끼 소스로 변경", "양 추가"],
    //     price: 10000,
    // }])

    const [menuVisible, setMenuVisible] 
        = useState(menuList.map((menu, i) => 
            <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList}/>))
    
    useEffect(updateCartMenu, [menuList]) 

    function updateCartMenu() {
        console.log(menuList)
        /////// not solvedddddd
        // if (menuList[0] === undefined) {setMenuVisible(<CartMenuItem menuDetail={menuList[0]} setMenuDetail={setMenuList}/>)}
        if (menuList[0] !== undefined) {
            var copied = [...menuList]
            console.log(copied.filter((el)=> el.qnty !== 0))
            setMenuVisible(copied.filter((el)=> el.qnty !== 0).map((menu, i) =><CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList}/>))
        }
        
        // else if (menuList[0]["qnty"] !== 0) {setMenuVisible(<CartMenuItem menuDetail={menuList[0]} setMenuDetail={setMenuList}/>)}
        // else {setMenuVisible()}
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
                <button onClick={() => setModal(<></>)} className="CartModal__bar-close"><CgClose></CgClose></button>
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
                <button className="CartModal__restmenu-add">+ Add More Menu</button>
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
                </ul>
            </div>
            <div className="CartModal__create-room">
                <span style={{color:"grey", fontSize:"0.9rem", fontWeight:"bold"}}>Didn’t find a room suitable for you?</span>
                <LongButton type="primary">Create your own room</LongButton>
            </div>
            <div className = "mainPage__separation"/>
        </div>
    )
}

export default CartModal;