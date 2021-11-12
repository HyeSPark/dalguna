import React, { useState } from 'react'
import '../cat_filter_page.css';
import dhspic from '../img/DHS_photo.jpeg';
import CatFilterBar from '../components/CatFilterBar';

function CatFilterPage() {
    const [curSelect, setCurSelect] = useState("Chicken")
    return (
        <div className="catFilterPage__">
            <CatFilterBar cur={curSelect} setCur={setCurSelect}/>
        </div>
    )
}

export default CatFilterPage