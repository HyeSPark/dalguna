import React, { useState } from 'react'
import '../cat_filter_page.css';
import dhspic from '../img/DHS_photo.jpeg';
import '../components/CatFilterBar.js'

function CatFilterPage() {
    const [curSelect, setCurSelect] = useState("chicken")
    return (
        <div className="catFilterPage__">
            <CatFilterBar cur={curSelect} setCur={setCurSelect}/>
        </div>
    )
}

export default CatFilterPage