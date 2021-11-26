import React, { useState } from 'react';

import RestTitleBox from './RestTitleBox.js'

import dhspic from '../img/DHS_photo.jpeg';
import MenuListItem from './MenuListItem';
import RestTab from './RestTab.js';
import TabBar from './TabBar.js';
import '../menu-page.css'
import LongButton from './LongButton.js';
import MenuAddOptions from './MenuAddOptions.js';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function MenuModal(props) {
    // 맨 위에 이름을 가게 이름으로 하는게 나을까?
    const { menuInfo, restName, setModal, cartItem, setCartItem, setVisible } = props;

    function goBack() {
        setModal(<></>)
        // setVisible("restPage")
    }

    var basePrice;
    if (menuInfo.priceOptions) {
        basePrice = menuInfo.price[0].price
    } else {
        basePrice = menuInfo.price[0]
    }
    const [totalPrice, setTotalPrice] = useState(basePrice)

    const [selectedPriceOption, setSelectedPriceOption] = useState(menuInfo.price[0].name)
    const [selectedAddOptions, setSelectedAddOptions] = useState([])

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
                &nbsp;&nbsp;{opt.name}
            </div>
            <div className="menuModal__option-item-price">
                {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)

    function handlePriceOptionChange(name, price) {
        setSelectedPriceOption(name)
        setTotalPrice(price)
    }


    function addToCart() {
        var menuName = menuInfo.name
        if (menuInfo.priceOptions) {
            menuName = menuName + " " + selectedPriceOption
        }
        const addedItem = 
        {   
            name: menuName,
            qnty: 1,
            detail: selectedAddOptions,
            price: totalPrice,
        }
        setCartItem([...cartItem, addedItem])
        goBack()

        console.log(cartItem)
    }


    return (
        
            <div className="menuModal__">
                <div className="menuModal__title">
                    <button className="menuModal__title-back" onClick={goBack}>
                        <AiOutlineArrowLeft /> 
                    </button>
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
                            <span>Price</span>
                            {menuInfo.priceOptions ? null : <span>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                            .format(basePrice)}</span>}
                        </span>
                        {menuInfo.priceOptions ? <ul className="menuModal__option-list">{priceOptionList}</ul>
                            : null}
                    </div>
                    <div className="menuModal__option">
                        {menuInfo.addMulti.map((opt, i) => 
                            <MenuAddOptions key={i} name={opt.name} options ={opt.options} type="checkbox"
                            totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedAddOptions={selectedAddOptions}
                            setSelectedAddOptions={setSelectedAddOptions}/>)}
                        {menuInfo.addUni.map((opt, i) => 
                            <MenuAddOptions key={i} name={opt.name} options ={opt.options} type="radio"
                            totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedAddOptions={selectedAddOptions}
                            setSelectedAddOptions={setSelectedAddOptions}/>)}
                    </div>
                </div>
                <div className="menuModal__button-container">
                    <div className="menu-page-add-to-cart-button">
                        <LongButton type="primary" onClick={addToCart}>Add to Cart ({new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                            .format(totalPrice)})</LongButton>
                    </div>
                </div>
            </div>
    )
}

export default MenuModal
