import React, { useState } from 'react';
import '../short_button.css';

function ShortButton(props) {
    const objType = {
        "primary": "shortButton__ shortButton__primary",
        "secondary": "shortButton__ shortButton__secondary"
    }
    return (
        <a href="#" className={objType[props.type]}>
            <span className="shortButton__text"> {props.children} </span>
        </a>
    )
}

// function ShortButtonInactive() {
//     return (
//         <a href="#" className="shortButtonInactive">
//             <span className="shortButton__text"> BUTTON </span>
//         </a>
//     )
// }

// export { ShortButtonActive, ShortButtonInactive }
export default ShortButton;