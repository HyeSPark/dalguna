import React, { useState } from 'react'
import '../cat_filter.css';
import dhspic from '../img/DHS_photo.jpeg';
import CatFilterBar from '../components/CatFilterBar';
import RestCard from '../components/RestCard';
import { useParams, Link } from 'react-router-dom';

function CatFilter() {
    const params = useParams();

    const catNameList = ["Korean", "Chicken", "Japanese", "Snacks", "Asian", "Salad", "Doshirak"]

    const [restInfo, setRestInfo] 
    = useState([{
        id:0, name:"대학생 치킨", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Chicken"
      },{
        id:1, name:"베리신주쿠", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Japanese"
      },{
        id:2, name:"마쯔미", minOrder:15000, 
        deliFee: 3000, deliTime: "27~31", img: dhspic,
        rooms: [{part: 2, order: "17:00"}, {part: 1, order: "18:00"}],
        category: "Japanese"
      }])
    
    const [curSelect, setCurSelect] = useState(params.name)
    var visRestList = restInfo.filter((rest) => rest.category==curSelect)
    const restList = visRestList.map((rest) => 
    <li key={rest.name} style={{listStyle:'none'}}>
      <Link to={{pathname: `/restaurant/${rest.id}`}}><RestCard restInfo={rest}></RestCard></Link>
    </li>
    )
    return (
        <div className="ui-container">
            <div className="CatFilter__">
                <CatFilterBar catNameList={catNameList} cur={curSelect} setCur={setCurSelect}/>
                <ul className="CatFilter__restList">
                    {restList}
                    <li style={{marginBottom:"15px", fontSize:"0.8rem", color:"grey"}}>
                        찾으시는 음식점이 없나요? 제작자에게 알려주세요
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default CatFilter