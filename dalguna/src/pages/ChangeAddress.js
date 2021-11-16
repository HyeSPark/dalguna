import React, { useState } from "react";
import "../change_address.css";

import AddrNavBar from "../components/AddrNavBar";

function ChangeAddress() {
    return (
        <div className="chngAddr__">
            <AddrNavBar/>
            <div className="chngAddr__seperation"></div>
        </div>
    )
}

export default ChangeAddress;