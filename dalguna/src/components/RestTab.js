import React, { useState } from 'react';
import '../rest_tab.css'

function RestTab(props) {
    const [menuFocused, setMenuFocused] = useState([true, false, false])
    const tabList = ["menu", "info", "room"]
    const focus = (ord) => {
        var newArr = [false, false, false]
        newArr[ord] = true
        setMenuFocused(newArr)
        props.setCurTab(tabList[ord])
    }

    const focusClassName = {true: "restTab__item restTab__focus", false: "restTab__item"}
    return (
        <div className="restTab__">
            <ul className="restTab__list" >
                <li className="restTab__menu" onClick={() => {focus(0)}}>
                    <button className={focusClassName[menuFocused[0]]}>
                        <span className="restTab__item-name">Menu</span>
                    </button>
                </li>
                <li className="restTab__info" onClick={() => {focus(1)}}>
                    <button className={focusClassName[menuFocused[1]]}>
                        <span className="restTab__item-name">Info</span>
                    </button>
                </li>
                <li className="restTab__room" onClick={() => {focus(2)}}>
                    <button className={focusClassName[menuFocused[2]]}>
                        <span className="restTab__item-name">Room</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default RestTab