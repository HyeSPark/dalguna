
import React, { useState } from 'react';
import './App.css';

import ShortButton from './components/ShortButton';
import LongButton from './components/LongButton';
import CartButton from './components/CartButton.js'
import RestTitleBox from './components/RestTitleBox.js'
import RestTab from './components/RestTab.js'
import MenuListItem from './components/MenuListItem';
import { BrowserRouter as Route, Router } from 'react-router-dom';
import { Main, CatFilter } from './pages';

import dhspic from './img/DHS_photo.jpeg';


function App() {
  // restInfo contains all information about the all restaurant with JSON Type
  // restRoom array will be changing actively
  // [NOT DECIDED] 통으로 전달 or 따로따로 전달?

  // [SOLVED] scroll!!!
  // [NOT SOLVED] 음식 카테고리 영어로 할거면 너무 길어서 못생기고 5개를 한 페이지에 넣기 좀 그럼...
  // .. 한국어로 바꾸면 행복할것같기도
  
  
  const [cartItem, setCartItem] 
    = useState({restName:"대학생 치킨", items:["몬스터 오븐 구이"]})

  const [menuItemInfo, setMenuItemInfo]
    = useState([{
      name: "냉모밀+돈까스만 (+보통소스,매운소스 선택)", 
      detail: "면요리(선택)+돈까스단품(선택)",
      price: 13500,
      img: dhspic
    },
    // {name: "돈까스정식+냉모밀 세트",
    //   detail: "돈까스(선택) + 소스2종 + 냉모밀 (미니냉모밀,빵잼은 제공하지 않아용)",
    //   price: "₩16,000",
    //   img: dhspic,} 
    ])
  

  
  // mapping the list
  

  const menuList = menuItemInfo.map((menu) => 
    <li key={menu.name} style={{listStyle:'none'}} className = "mainPage__menu-item">
      <a href="#"> <MenuListItem menuItemInfo={menu}></MenuListItem></a>
    </li>
  )

  
  // cart visible
  const isVisible = false;
  const objVisible 
  = {true: "",
      false: "hide"}
  
  return (
    <div className="App">
      <Main></Main>
      
      {/* <RestTitleBox restName="대학생 치킨" restRating="5.0 (100)"></RestTitleBox>
      <div className={objVisible[isVisible]}>
        <CartButton cartItem={cartItem}></CartButton>
      </div> */}
      {/* <CatFilter restInfo={restInfo} curSelect={"Chicken"} catNameList={catNameList}/> */}

    </div>
  );
}

export default App;
