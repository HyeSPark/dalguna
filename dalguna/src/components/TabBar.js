import React, { useState } from 'react';
import '../tab-bar.css'

import { CgHome, CgSearch, CgHeart, CgProfile, CgMenuBoxed } from 'react-icons/cg'

function TabBar() {
    const [menuFocused, setMenuFocused] = useState([true, false, false, false, false])
    const focus = (ord) => {
        var newArr = [false, false, false, false, false]
        newArr[ord] = true
        setMenuFocused(newArr)
    }

    const focusClassName = {true: "tabBar__menu tabBar__focus", false: "tabBar__menu"}
    return (
        <div className="tabBar__">
            <ul className="tabBar__menu-list" >
                <li className="tabBar__home" onClick={() => {focus(0)}}>
                    <a className={focusClassName[menuFocused[0]]} href="#">
                    <CgHome></CgHome>
                    <span className="tabBar__menu-name">Home</span>
                    </a>
                </li>
                <li className="tabBar__search" onClick={() => {focus(1)}}>
                    <a className={focusClassName[menuFocused[1]]} href="#">
                    <CgSearch></CgSearch>
                    <span className="tabBar__menu-name">Search</span>
                    </a>
                </li>
                <li className="tabBar__fav" onClick={() => {focus(2)}}>
                    <a className={focusClassName[menuFocused[2]]} href="#">
                    <CgHeart></CgHeart>
                    <span className="tabBar__menu-name">Favorite</span>
                    </a>
                </li>
                <li className="tabBar__order" onClick={() => {focus(3)}}>
                    <a className={focusClassName[menuFocused[3]]} href="#">
                    <CgMenuBoxed></CgMenuBoxed><span className="tabBar__menu-name">Order</span>
                    </a>
                </li>
                <li className="tabBar__profile" onClick={() => {focus(4)}}>
                    <a className={focusClassName[menuFocused[4]]} href="#">
                    <CgProfile></CgProfile>
                    <span className="tabBar__menu-name">Profile</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default TabBar