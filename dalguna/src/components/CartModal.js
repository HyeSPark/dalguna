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
    
    const { restName, menuList, setMenuList, setModal, roomList, roomLength, isCreateAvailable, deliAddr } = props
    

    const [menuVisible, setMenuVisible] 
        = useState(menuList.map((menu, i) => 
            <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
    
    useEffect(updateCartMenu, [menuList]) 
    function goBack() {
        setModal(<></>)
    }
    function updateCartMenu() {
        console.log(params.userId, menuList)
        var copied = [...menuList]
           
        setMenuVisible(copied.filter((el)=> el.qnty !== 0)
            .map((menu, i) =>
                <CartMenuItem key={i} menuDetail={menu} setMenuDetail={setMenuList} menuList={menuList} menuId={i}/>))
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
                    {roomLength !== 0 ? roomList : <p style={{color:"grey"}}> 현재 가능한 방이 없습니다. </p> }
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