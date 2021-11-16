import React from 'react';
import '../addr_nav_bar.css'
import { CgClose, CgSearch } from 'react-icons/cg';
import { MdLocationSearching } from "react-icons/md"

function AddrNavBar() {
    return (
        <div className="addrNavBar__">
            <div className="addrNavBar__nav">
                <a href="#" className="addrNavBar__nav-close"><CgClose/></a>
                <div className="addrNavBar__nav-title">Set Order Address</div>
            </div>
            <div className="addrNavBar__search">
                <div className="addrNavBar__search-icon"><CgSearch/></div>
                <input className="addrNavBar__search-input" placeholder="Road name, building name, or lot number"></input>
            </div>
            <div className="addrNavBar__currLoc">
                <div className="addrNavBar__currLoc-icon"><MdLocationSearching/></div>
                <div className="addrNavBar__currLoc-text">Use current location</div>
            </div>
            <div className="addrNavBar__separation"></div>
        </div>
    )
}

export default AddrNavBar