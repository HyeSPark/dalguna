import React, { useState } from 'react'
import '../cat_filter.css';
import dhspic from '../img/DHS_photo.jpeg';
import CatFilterBar from '../components/CatFilterBar';
import RestCard from '../components/RestCard';
import { useParams, Link } from 'react-router-dom';

import staticDB from "../db/static.json";

function CatFilter() {
    const params = useParams();

    const catNameList = ["Korean", "Chicken", "Japanese", "Snacks", "Asian", "Salad", "Doshirak", "중국집", "덮밥"]

    const [restInfo, setRestInfo] 
    = useState(staticDB)
    
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