import React, { useState } from "react";
import { MdLocationSearching } from "react-icons/md"
import "../change_address.css";

import AddrNavBar from "../components/AddrNavBar";

function ChangeAddress() {
    return (
        <div className="chngAddr__">
            <AddrNavBar/>
            <div className="chngAddr__locBtn">
                <div className="chngAddr_locBtn-icon"><MdLocationSearching/></div>
                <div className="chngAddr_locBtn-text">Find address using current location</div>
            </div>
        </div>
    )
}

export default ChangeAddress;