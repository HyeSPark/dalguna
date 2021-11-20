import React, { useState } from 'react';

import RestTitleBox from '../components/RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from '../components/MenuListItem';
import RestTab from '../components/RestTab.js';
import TabBar from '../components/TabBar.js';
import '../menu-page.css'
import LongButton from '../components/LongButton.js';

function MenuPage(props) {

    const [menuItemInfo, setMenuItemInfo]
    = useState([{
      name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
      detail: "면요리(선택)+돈까스단품(선택)",
      price: 13500,
      img: dhspic
    },
    {name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)",
      detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
      price: 16000,
      img: dhspic,},{
        name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
        detail: "면요리(선택)+돈까스단품(선택)",
        price: 13500,
        img: dhspic
      }
    ])

    return (
        <div className="ui-container">
            <div className="rest-title-image" style={{backgroundImage: `url(${dhspic})`}}>
                <RestTitleBox restName="대학생 치킨" restRating="5.0 (100)"></RestTitleBox>   
            </div>
            <div className="menu-page-info-box">
                <div className="menuListItem__desc-name">냉모밀+돈까스만 (+보통소스,매운소스 선택)</div>
                <div className="menuListItem__desc-detail">면요리(선택)+돈까스단품(선택)</div>
                <div className="menuListItem__desc-price menupage_price_box">
                    <span className="menupage_price"> Price</span>
                    <span className="menupage_price_value"> 16000 </span>
                </div>
                <br/>
                <div className="menuListItem__desc-price menupage_price_box">
                    <span className="menupage_price"> Amount</span>
                    <span className="menupage_price_value"> 1 </span>
                </div>
            </div>
            
            <div className="menu-page-add-to-cart-button">
                <LongButton type="primary"> Add to Cart</LongButton>
            </div>
        </div>
    )
}

export default MenuPage
