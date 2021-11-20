import React, { useState } from 'react';
import '../addr_sel.css'
// import { CgClose, CgSearch } from 'react-icons/cg';
import DeliveryBox from '../components/DeliveryBox.js'

function AddrSel() {
    const [boxInfo, setBoxInfo] = useState([{
        name: "Areum Hall", time: 5, selected: true
    }, {
        name: "Seongsil Hall", time: 7, selected: false
    }, {
        name: "Mirae Hall", time: 9, selected: false
    }, {
        name: "Narae Hall", time: 10, selected: false
    }])

    const focus = (ord) => {
        var newArr = [...boxInfo]
        for (var box of newArr) {
            box['selected'] = false
        }
        newArr[ord]['selected'] = true
        setBoxInfo(newArr)
    }

    const boxList = boxInfo.map((box, index) =>
    <li key={box.name} style={{listStyle:'none'}}>
        <a href="#" onClick={() => {focus(index)}}><DeliveryBox boxInfo={box}/></a>
    </li>
    )

    return (
        <div>
            <div className="addrSel__background">
            </div>
            <div className="addrSel__">
                {boxList}
            </div>
        </div>
        
    )
}

export default AddrSel