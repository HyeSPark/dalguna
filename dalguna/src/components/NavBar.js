import React from 'react';
import '../nav_bar.css'
import { CgMenu, CgProfile, CgSearch } from 'react-icons/cg';
import { BsChevronDown } from 'react-icons/bs'

function NavBar() {
    return (
        <div className="navBar__">
            <div className="navBar__nav">
                <a href="#" className="navBar__nav-menu"><CgMenu/></a>
                <a href="#" className="navBar__nav-loc">
                    <div className="navBar__nav-loc-adrs">291 Daehak-ro, Yuseong-gu</div> 
                    <BsChevronDown style={{marginTop:"2px", marginLeft:"2px"}}/>
                </a>
                <a href="#" className="navBar__nav-profile"><CgProfile/></a>
            </div>
            <div className="navBar__search">
                <div className="navBar__search-icon"><CgSearch/></div>
                <input className="navBar__search-input" placeholder="Search for the food and restaurant!"/>
            </div>
        </div>
    )
}

export default NavBar