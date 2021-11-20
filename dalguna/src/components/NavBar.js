import React, { useState } from 'react';
import '../nav_bar.css'
import { CgMenu, CgProfile, CgSearch } from 'react-icons/cg';
import { BsChevronDown } from 'react-icons/bs'
import AddrSel  from '../components/AddrSel.js'

function NavBar() {
    const [showAddr, setShowAddr] = useState(false)
    const onClick = () => setShowAddr(!showAddr)

    return (
        <div className="navBar__">
            <div className="navBar__nav">
                <a href="#" className="navBar__nav-menu"><CgMenu/></a>
                <a href="#" className="navBar__nav-loc" onClick={onClick}>
                    <div className="navBar__nav-loc-adrs">291 Daehak-ro, Yuseong-gu</div> 
                    <BsChevronDown style={{marginTop:"2px", marginLeft:"2px"}}/>
                </a>
                <a href="#" className="navBar__nav-profile"><CgProfile/></a>
            </div>
            <div className="navBar__search">
                <div className="navBar__search-icon"><CgSearch/></div>
                <input className="navBar__search-input" placeholder="Search for the food and restaurant!"/>
            </div>
            {showAddr ? <AddrSel/> : null}
        </div>
    )
}

export default NavBar