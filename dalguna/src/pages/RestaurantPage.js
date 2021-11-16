import React, { useState } from 'react';

import RestTitleBox from '../components/RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from '../components/MenuListItem';
import RestTab from '../components/RestTab.js';
import TabBar from '../components/TabBar.js';
import '../rest-page.css'

function RestaurantPage(props) {

    const [menuItemInfo, setMenuItemInfo]
    = useState([{
      name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
      detail: "면요리(선택)+돈까스단품(선택)",
      price: 13500,
      img: dhspic
    },
    {name: "돈까스정식+냉모밀 세트",
      detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
      price: "₩16,000",
      img: dhspic,} 
    ])

    const menuList = menuItemInfo.map((menu) => 
    <li key={menu.name} style={{listStyle:'none'}} className = "mainPage__menu-item">
      <a href="#"> <MenuListItem menuItemInfo={menu}></MenuListItem></a>
    </li>
    )

    return (
        <div>
            <div className="rest-title-image" style={{backgroundImage: `url(${dhspic})`}}>
                <RestTitleBox restName="대학생 치킨" restRating="5.0 (100)"></RestTitleBox>   
            </div>
            <RestTab/>
            {menuList}
            <TabBar/>
        </div>
    )
}

export default RestaurantPage
