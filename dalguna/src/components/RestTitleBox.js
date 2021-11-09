import React, { useState } from 'react';
import '../rest-title-box.css';
import { AiFillStar } from 'react-icons/ai'

function RestTitleBox(props) {
    

    return (
        <div className="restTitleBox__">
            <div className="restTitleBox__name">
                {props.restName}
            </div>
            <div className="restTitleBox__rating">
                <span className="restTitleBoox__rating-icon" style={{verticalAlign:"-10%"}}><AiFillStar /></span> {props.restRating}
            </div>
        </div>
    )
}

export default RestTitleBox;