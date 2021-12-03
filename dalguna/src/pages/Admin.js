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
    const [roomListPaid, setRoomListPaid] = useState(<></>);
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
        const longButtonType = {true: "secondary", false: "primary"};
        
        return (<div className="admin_parti">
            <div style={{fontSize:"1.3rem"}}>Name: <span style={{fontWeight:"bold"}}>{name}</span>{/*, id: {userId}*/}</div>
            {menu.map((({name, detail, price, qnty}, i) => {
                const menuOptions = detail.map((el, i) => {
                    if (el.selected.length !== 0) {
                        const menuSelectedOptions = el.selected.map((opt, i) => {
                            if (i < el.selected.length-1) return (<span key={i}>{opt}, </span>)
                            else return (<span key={i}>{opt} </span>)
                        })
                        return (<li key={i} style={{listStyle:"initial", lineHeight:"1.3rem"}}>{el.name}: {menuSelectedOptions}</li>)
                    }
                })
                return (
                    <div key={i} className="CartMenuItem__detail admin">
                        <p>{name}</p>
                        <br/>
                        <ul style={{paddingLeft:"15px", fontSize:"0.9rem", marginTop:"0px"}}>{ menuOptions }</ul>
                        <p>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                        .format(price)}</p>
                        <p>{qnty}</p>
                    </div>)}
                    ))}
            <div className="admin-totPrice">Total price: <span style={{fontWeight:"bold"}}>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(price+deliFee)}</span></div>
            <LongButton type={longButtonType[isPaid]} onClick={() => handlePaidClicked(userId)}>Paid?</LongButton>
        </div>)
    }
    function updateAfterOrder() {
        const paidPeople = userInfo.filter((el) => el.paid).map(({id}) => id)

        const newRoomListAfterOrder = roomInfo
            .filter((el) => el.ordStat === 1)
            .sort((a, b) => a.endTime > b.endTime ? 1 : -1)
            .map(({ roomId, addr, parti, rest }, i) => {
                const deliFeeForEach = rest.deliInfo.fee/parti.length
                const paidPrice = parti.reduce((money, user) => 
                    paidPeople.filter((el) => el === user.id).length !== 0 ? money + user.price + deliFeeForEach : money, 0)
                // parti 를 돌면서 해당 아이디의 paid를 검사하고, 만약 paid라면 price를 paidPrice에 추가
                const isAllPartiPaid = parti
                    .every(({id}) => paidPeople.filter((paidId) => paidId === id)
                                                .length !== 0)
                if (isAllPartiPaid) {
                    updateDoc(doc(db, "rooms", roomId), {
                        "ordStat": 2,
                    })
                    return (null)
                }

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
                .sort((a, b) => a.endTime > b.endTime ? 1 : -1)
                .map(({parti, addr, poolMon, timeLeft, rest}, i) => (<div key={i}>
                        <div>participants name: 
                        {parti.map(({id}, i) => <span key={i}> {userInfo.filter((el) => el.id === id)[0].name}</span>)}</div>
                        <div>Delivery Address: {addr}</div>
                        <div>Remaining: {timeLeft} min</div>
                        <div>{poolMon} / {rest.deliInfo.minOrder}</div>
                    </div>))
        setRoomListBeforeOrder(newRoomListBeforeOrder);
    }

    function updateAfterPaid() {

    }

    useEffect(() => {
        if (roomInfo.length !== 0 
            && userInfo.length !== 0) {
                updateAfterOrder()
                updateBeforeOrder()
                updateAfterPaid()
            }
    }, [roomInfo, userInfo])

    return (
        <div className="admin-container">
            <h2 style={{color:'white'}}>Order finished, but not paid yet</h2>
            {roomListAfterOrder}
            <h2 style={{color:'white'}}>Not ordered yet</h2>
            {roomListBeforeOrder}
            <h2 style={{color:'white'}}>They all paid!!!!</h2>
            {roomListPaid}

        </div>)
}

export default Admin;