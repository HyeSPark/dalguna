import React, { useState } from 'react';
import '../menu-list-item.css';

function MenuListItem(props) {
    // [NOT SOLVED] name responsive하게 줄어들도록 js 처리
    return (
        <div className="menuListItem__">
            <div className="menuListItem__desc">
                <div className="menuListItem__desc-name">
                    {props.menuItemInfo.name}
                </div>
                <div className="menuListItem__desc-detail">
                    {props.menuItemInfo.detail}
                </div>
                <div className="menuListItem__desc-price">
                    {props.menuItemInfo.price}
                </div>
            </div>
            
            <img className="menuListItem__img" src={props.menuItemInfo.img}/>
        </div>
    )
}

export default MenuListItem