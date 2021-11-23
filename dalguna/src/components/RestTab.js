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
                    <a className={focusClassName[menuFocused[0]]} href="#">
                    <span className="restTab__item-name">Menu</span>
                    </a>
                </li>
                <li className="restTab__info" onClick={() => {focus(1)}}>
                    <a className={focusClassName[menuFocused[1]]} href="#">
                    <span className="restTab__item-name">Info</span>
                    </a>
                </li>
                <li className="restTab__room" onClick={() => {focus(2)}}>
                    <a className={focusClassName[menuFocused[2]]} href="#">
                    <span className="restTab__item-name">Room</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default RestTab