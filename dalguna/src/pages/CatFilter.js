import React, { useState, useEffect } from 'react'
import '../cat_filter.css';
import dhspic from '../img/DHS_photo.jpeg';
import CatFilterBar from '../components/CatFilterBar';
import RestCard from '../components/RestCard';

import { useParams, Link } from 'react-router-dom';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config.js";

// import staticDB from "../db/static.json";
import staticDB from "../db/id402_restuarants.json";

function CatFilter() {
    const params = useParams();

    const catNameList = ["한식", "일식", "분식", "양식", "샐러드", "도시락", "중국집", "덮밥"]

    const [restInfo, setRestInfo] = useState(staticDB)
    const [roomInfo, setRoomInfo] = useState([]);

    function getRooms() {
        onSnapshot(collection(db, "rooms"), (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => tmp.push({room_id: doc.id, room: doc.data()}))
          setRoomInfo(tmp.map(({room}) => ({
              'roomId': room.id, 'restName': room.restName,
              'deliInfo': room.deliInfo, 'ordStat': room.ordStat,
              'parti': room.parti, 'endTime': room.endTime,
              'rest': restInfo.filter((rest) => rest.name == room.restName)[0],
              'timeLeft': parseInt((room.endTime.seconds - new Date().getTime() / 1000) / 60),
              'poolMon': room.parti.reduce((money, part) => money + part.price, 0)
            })));
        })
      }
    
      useEffect(() => {
        getRooms();
      }, []);
    
    const [curSelect, setCurSelect] = useState(params.name)
    var visRestList = restInfo.filter((rest) => rest.category==curSelect)
    // const restList = visRestList.map((rest) => 
    // <li key={rest.name} style={{listStyle:'none'}}>
    //   <Link to={`../${params.userId}/restaurant/${rest.id}`}><RestCard restInfo={rest} roomInfo={roomInfo}></RestCard></Link>
    // </li>
    // )

    const stringToTime = (str) => {
      const [hour, minute] = str.split(':').map((el) => parseInt(el));
      return hour * 60 + minute;
    }
    const restList = visRestList.filter((rest) => {
      const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
      return stringToTime(rest.open) <= nowTime && nowTime <= stringToTime(rest.close);
    }).map((rest, i) => 
    <li key={i} style={{listStyle:'none'}}>
       <Link to={`../${params.userId}/restaurant/${rest.id}`}><RestCard restInfo={rest} roomInfo={roomInfo}></RestCard></Link>
    </li>)

    return (
        <div className="ui-container">
            <div className="CatFilter__">
                <CatFilterBar catNameList={catNameList} cur={curSelect} setCur={setCurSelect}/>
                <ul className="CatFilter__restList">
                    {restList}
                    <li style={{paddingBottom:"15px", fontSize:"0.8rem", color:"grey"}}>
                        찾으시는 음식점이 없나요? 제작자에게 알려주세요
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default CatFilter