import React, {useState, useEffect} from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from "../firebase-config.js";
import staticDB from "../db/static.json";

function Admin() {

    const [roomInfo, setRoomInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [restInfo, setRestInfo] = useState(staticDB);
    const [display, setDisplay] = useState(<></>);
    const ordStatObj = {0: "not ordered", 1: "ordered", 2: "paid", 3: "delivered"}
    

    function getRooms() {
        onSnapshot(collection(db, "rooms"), (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => tmp.push({room_id: doc.id, room: doc.data()}))
          setRoomInfo(tmp.map(({room, room_id}) => ({
              'roomId': room_id, 'restName': room.restName,
              'addr': room.addr, 'ordStat': room.ordStat,
              'parti': room.parti, 'endTime': room.endTime,
              'timeLeft': parseInt((room.endTime.seconds - new Date().getTime() / 1000) / 60),
              'rest': restInfo.filter((rest) => rest.name == room.restName)[0],
              'poolMon': room.parti.reduce((money, menu) => money + menu.price, 0) 
            })));
        })

        onSnapshot(collection(db, "users"), (snapshot) => {
            const tmp = [];
            snapshot.forEach((doc) => tmp.push({user_id: doc.id, user: doc.data()}))
            setUserInfo(tmp.map(({user_id, user}) => ({'id': user_id, 'name': user.name, 'addr': user.addr, 'paid':user.paid})));
        })
    }
    
    useEffect(() => {
        getRooms();
    }, []);

    const orderedPartiMap = (userId, menu, price, deliFee) => {
        const name = userInfo.filter((el) => el.id === userId)[0].name;
        return (<div className="admin_parti">
            <div>name: {name}{/*, id: {userId}*/}</div>
            {menu.map((({name, detail, price, qnty}) => (
                <div className="CartMenuItem__detail admin">
                    <p>{name}</p>
                    <br/>
                    <p>{detail.map((el, i) => (<span key={i}>{el}, </span>))}</p>
                    <p>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(price)}</p>
                    <p>{qnty}</p>
                </div>)))}
            <div className="admin-totPrice">Total price: {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(price+deliFee)}</div>
        </div>)
    }
    function updateDisplay() {
        console.log(roomInfo)
        const roomListBeforeOrder = roomInfo
                .filter((el) => el.ordStat === 0)
                .map(({parti, addr, endTime, timeLeft}) => 
                    (<div>
                        <div>participants name: 
                        {parti.map(({id}) => <span> {userInfo.filter((el) => el.id === id)[0].name}</span>)}</div>
                        <div>Delivery Address: {addr}</div>
                        <div>EndTime: {endTime}</div>
                        <div>Remaining: {timeLeft}</div>
                    </div>))
        const roomListAfterOrder = roomInfo
            .filter((el) => el.ordStat === 1)
            .map(({ roomId, addr, parti, rest }) => (
                <div className="admin_room">
                    <div style={{paddingTop:"15px"}}>Room Id: {roomId}</div>
                    <div>Delivery Address: {addr}</div>
                    <div className="admin_partiList">{parti.map(({id, menu, price}) => 
                        orderedPartiMap(id, menu, price, rest.deliInfo.fee/parti.length))}</div>
                    <div style={{paddingBottom:"15px"}}>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(parti.reduce((pooledPrice, menu) => pooledPrice + menu.price, rest.deliInfo.fee))}</div>
                </div>
            ))

        setDisplay(<div className="admin-container">
            {roomListAfterOrder}
            </div>);
    }

    useEffect(() => {
        if (roomInfo.length !== 0 
            && userInfo.length !== 0) updateDisplay()
    }, [roomInfo, userInfo])

    return (
    <main className="ui-container">
        {display}
    </main>)
}

export default Admin;