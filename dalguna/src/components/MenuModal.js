import React, { useState } from 'react';

import RestTitleBox from './RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from './MenuListItem';
import RestTab from './RestTab.js';
import TabBar from './TabBar.js';
import '../menu-page.css'
import LongButton from './LongButton.js';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function MenuModal(props) {
    // 맨 위에 이름을 가게 이름으로 하는게 나을까?
    const { menuInfo, restName, setModal } = props;
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

    function goBack() {
        props.setModal(<></>)
    }

    var basePrice;
    if (menuInfo.priceOptions) {
        basePrice = menuInfo.price[0].price
    } else {
        basePrice = menuInfo.price[0]
    }
    const [totalPrice, setTotalPrice] = useState(new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
    .format(basePrice))

    const [selectedPriceOption, setSelectedPriceOption] = useState(menuInfo.price[0].name)

    function handlePriceOptionChange(name, price) {
        setSelectedPriceOption(name)
        setTotalPrice(new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
        .format(price))
    }

    const priceOptionList = menuInfo["price"].map((opt, i) => 
        <li className="menuModal__option-item" key={i}>
            <div className="menuModal__option-item-name">
                <input 
                    type="radio"
                    id = {opt.name}
                    value={opt.name}
                    name="priceOption"
                    checked={selectedPriceOption === opt.name}
                    onChange={() => handlePriceOptionChange(opt.name, opt.price)}/>
                {opt.name}
            </div>
            <div className="menuModal__option-item-price">
                {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)
    

    return (
        <div className="ui-container">
            {/* <div className="rest-title-image" style={{backgroundImage: `url(${dhspic})`}}>
            </div> */}
            <div className="menuModal__">
                <div className="menuModal__title">
                    <a href="#" className="menuModal__title-back" onClick={goBack}>
                        <AiOutlineArrowLeft /> 
                    </a>
                    <div className="menuModal__title-restName">
                        {restName}
                    </div>
                </div>
                <div className="menu-page-info-box">
                    <div className="menuListItem__desc-name">{menuInfo.name}</div>
                    <div className="menuListItem__desc-detail">{menuInfo.detail}</div>
                </div>
                <div className="menuModal__selections">
                    <div className="menuModal__option">
                        <span className="menuModal__option-title">
                            Price
                        </span>
                        <ul className="menuModal__option-list">
                            {priceOptionList}
                        </ul>
                    </div>
                </div>
                
                <div className="menu-page-add-to-cart-button">
                    <LongButton type="primary">Add to Cart ({totalPrice})</LongButton>
                </div>
            </div>
        </div>
    )
}

export default MenuModal
