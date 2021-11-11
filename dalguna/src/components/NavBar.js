import React, { useState } from 'react';
import '../nav_bar.css'
import { CgMenu, CgProfile, CgSearch } from 'react-icons/cg';
import { BsChevronDown } from 'react-icons/bs'

function NavBar() {
    return (
        <div className="navBar__">
            <div className="navBar__nav">
                <a href="#" className="navBar__nav-menu">
                    <CgMenu></CgMenu>
                </a>
                <a href="#" className="navBar__nav-loc">
                    <div className="navBar__nav-loc-add">291 Daehak-ro, Yuseong-gu</div> <BsChevronDown style={{verticalAlign:"-20%"}}></BsChevronDown>
                </a>
                <a href="#" className="navBar__nav-profile">
                    <CgProfile></CgProfile>
                </a>
            </div>
            <div className="navBar__search">
                <div className="navBar__search-icon">
                    <CgSearch></CgSearch>
                </div>
                <input className="navBar__search-input" placeholder="Search for the food and restaurant"></input>
            </div>
        </div>
    )
}

export default NavBar