import React, { useState } from 'react';
import '../nav_bar.css'
import { CgMenu, CgProfile, CgSearch } from 'react-icons/cg';
import { BsChevronDown } from 'react-icons/bs'
import AddrSel  from '../components/AddrSel.js'

function NavBar(props) {

    const { deliAddr, setDeliAddr } = props;
    const [showAddr, setShowAddr] = useState(false)
    const onClick = () => setShowAddr(!showAddr)

    // const [curAddr, setCurAddr] = useState("배달장소 선택")

    return (
        <div className="navBar__">
            <div className="navBar__nav">
                <a href="#" className="navBar__nav-menu"><CgMenu/></a>
                <button href="#" className="navBar__nav-loc" onClick={onClick}>
                    <div className="navBar__nav-loc-adrs">{deliAddr}</div> 
                    <BsChevronDown style={{marginTop:"2px", marginLeft:"2px"}}/>
                </button>
                <a href="#" className="navBar__nav-profile"><CgProfile/></a>
            </div>
            <div className="navBar__search">
                <div className="navBar__search-icon"><CgSearch/></div>
                <input className="navBar__search-input" placeholder="Search for the food and restaurant!"/>
            </div>
            {showAddr ? <AddrSel deliAddr={deliAddr} setDeliAddr={setDeliAddr} setShowAddr={setShowAddr}/> : null}
        </div>
    )
}

export default NavBar