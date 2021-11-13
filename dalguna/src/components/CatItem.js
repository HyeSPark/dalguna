import React from 'react'
import '../cat_item.css';

function CatItem(props) {
    return(
        <div className="catItem__">
            <div className="catItem__img-wrapper">
                <img className="catItem__img" src={props.img}/>
            </div>
            
            <label className="catItem__name">
                {props.name}
            </label>
        </div>
    )
}

export default CatItem