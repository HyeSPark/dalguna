import React, {useState, useEffect} from 'react'
import { onSnapshot, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase-config.js";
// import staticDB from "../db/static.json";
import staticDB from "../db/id402_restuarants.json";
import LongButton from '../components/LongButton';
import ShortButton from '../components/ShortButton';

function Admin() {

    const [roomInfo, setRoomInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [restInfo, setRestInfo] = useState(staticDB);
    const [display, setDisplay] = useState(<></>);
    const [roomListAfterOrder, setRoomListAfterOrder] = useState(<></>);
    const [roomListBeforeOrder, setRoomListBeforeOrder] = useState(<></>);
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

    function handlePaidClicked(userId) {
        updateDoc(doc(db, "users", userId), {
            "paid": true,
        })
    }

    const orderedPartiMap = (userId, menu, price, deliFee) => {
        const name = userInfo.filter((el) => el.id === userId)[0].name;
        const isPaid = userInfo.filter((el) => el.id === userId)[0].paid;
        const longButtonType = {true: "secondary", false: "primary"}
        return (<div className="admin_parti">
            <div>name: {name}{/*, id: {userId}*/}</div>
            {menu.map((({name, detail, price, qnty}, i) => (
                <div key={i} className="CartMenuItem__detail admin">
                    <p>{name}</p>
                    <br/>
                    <p>{detail.map((el, i) => (<span key={i}>{el}, </span>))}</p>
                    <p>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(price)}</p>
                    <p>{qnty}</p>
                </div>)))}
            <div className="admin-totPrice">Total price: {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(price+deliFee)}</div>
            <LongButton type={longButtonType[isPaid]} onClick={() => handlePaidClicked(userId)}>Paid?</LongButton>
        </div>)
    }
    function updateAfterOrder() {
        const paidPeople = userInfo.filter((el) => el.paid).map(({id}) => id)

        const newRoomListAfterOrder = roomInfo
            .filter((el) => el.ordStat === 1)
            .map(({ roomId, addr, parti, rest }, i) => {
                const deliFeeForEach = rest.deliInfo.fee/parti.length
                const paidPrice = parti.reduce((money, user) => 
                    paidPeople.filter((el) => el === user.id).length !== 0 ? money + user.price + deliFeeForEach : money, 0)
                // parti 를 돌면서 해당 아이디의 paid를 검사하고, 만약 paid라면 price를 paidPrice에 추가
                
                return (
                <div key={i} className="admin_room">
                    <div style={{paddingTop:"15px"}}>Room Id: {roomId}</div>
                    <div>Delivery Address: {addr}</div>
                    <div className="admin_partiList">{parti.map(({id, menu, price}) => 
                        orderedPartiMap(id, menu, price, deliFeeForEach))}</div>
                    <div style={{paddingBottom:"15px"}}>
                        <span style={{fontWeight:"bold"}}>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(paidPrice)}</span> / {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(parti.reduce((pooledPrice, menu) => pooledPrice + menu.price, rest.deliInfo.fee))}</div>
                </div>
            )})

        setRoomListAfterOrder(newRoomListAfterOrder);
    }

    function updateBeforeOrder() {

        console.log(roomInfo)
        const newRoomListBeforeOrder = roomInfo
                .filter((el) => el.ordStat === 0)
                .map(({parti, addr, endTime, timeLeft}, i) => (<div key={i}>
                        <div>participants name: 
                        {parti.map(({id}, i) => <span key={i}> {userInfo.filter((el) => el.id === id)[0].name}</span>)}</div>
                        <div>Delivery Address: {addr}</div>
                        <div>Remaining: {timeLeft}</div>
                    </div>))
        setRoomListBeforeOrder(newRoomListBeforeOrder);
    }

    useEffect(() => {
        if (roomInfo.length !== 0 
            && userInfo.length !== 0) {
                updateAfterOrder()
                updateBeforeOrder()
            }
    }, [roomInfo, userInfo])

    return (
    <main className="ui-container">
        <div className="admin-container">
            <h2>Order finished, but not paid yet</h2>
            {roomListAfterOrder}
        </div>
        <div className="admin-container">
            <h2>Not ordered yet</h2>
            {roomListBeforeOrder}
        </div>
    </main>)
}

export default Admin;