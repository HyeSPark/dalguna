import React, { useState } from 'react'
import '../cat_filter.css';
import dhspic from '../img/DHS_photo.jpeg';
import CatFilterBar from '../components/CatFilterBar';
import RestCard from '../components/RestCard';

function CatFilter(props) {
    
    const [curSelect, setCurSelect] = useState(props.curSelect)
    
    var visRestList = props.restInfo.filter((rest) => rest.category==curSelect)
    const restList = visRestList.map((rest) => 
    <li key={rest.name} style={{listStyle:'none'}}>
      <a href="#"><RestCard restInfo={rest}></RestCard></a>
    </li>
    )
    return (
        <div className="CatFilter__">
            <CatFilterBar catNameList={props.catNameList} cur={curSelect} setCur={setCurSelect}/>
            <ul className="CatFilter__restList">
                {restList}
                <li style={{marginBottom:"15px", fontSize:"0.8rem", color:"grey"}}>
                    찾으시는 음식점이 없나요? 제작자에게 알려주세요
                </li>
            </ul>
        </div>
    )
}

export default CatFilter