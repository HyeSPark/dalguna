import React, { useState } from 'react';
import '../addr_sel.css'
// import { CgClose, CgSearch } from 'react-icons/cg';
import DeliveryBox from '../components/DeliveryBox.js'

function AddrSel(props) {

    // [To be implemented] db upload & download in here

    const { deliAddr, setDeliAddr, setShowAddr } = props;

    const [boxInfo, setBoxInfo] = useState([{
        name: "아름관", time: 5, selected: deliAddr=="아름관" ? true : false
    }, {
        name: "미르나래관", time: 7, selected: deliAddr=="미르나래관" ? true : false
    }])

    const focus = (ord) => {
        var newArr = [...boxInfo]
        for (var box of newArr) {
            box['selected'] = false
        }
        newArr[ord]['selected'] = true
        setBoxInfo(newArr)
        setDeliAddr(boxInfo[ord].name)
    }

    const boxList = boxInfo.map((box, index) =>
    <li key={box.name} style={{listStyle:'none'}}>
        <button className="delBox__wrap" onClick={() => {focus(index)}}><DeliveryBox boxInfo={box}/></button>
    </li>
    )

    return (
        <div>
            <div className="addrSel__">
                <ul className="addrSel__list">
                    {boxList}
                </ul>
            </div>
            <div onClick={()=>setShowAddr(false)}className="addrSel__background">
            </div>
        </div>
        
    )
}

export default AddrSel