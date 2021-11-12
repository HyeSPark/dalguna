import React, { useState } from 'react';
import '../long_button.css';

function LongButton(props) {
    const objType = {
        "primary": "longButton__ longButton__primary",
        "secondary": "longButton__ longButton__secondary"
    }
    return (
        <a href="#" className={objType[props.type]}>
            <span className="longButton__text"> {props.children} </span>
        </a>
    )
}

// function LongButtonInactive() {
//     return (
//         <a href="#" className="longButtonInactive">
//             <span className="longButtonInactive__text"> BUTTON </span>
//         </a>
//     )
// }

// export { LongButtonActive, LongButtonInactive }
export default LongButton;