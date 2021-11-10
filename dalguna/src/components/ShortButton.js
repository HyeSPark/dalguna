import React, { useState } from 'react';
import '../short_button.css';

function ShortButtonActive() {
    return (
        <a href="#" className="shortButtonActive">
            <span className="shortButton__text"> BUTTON </span>
        </a>
    )
}

function ShortButtonInactive() {
    return (
        <a href="#" className="shortButtonInactive">
            <span className="shortButton__text"> BUTTON </span>
        </a>
    )
}

export { ShortButtonActive, ShortButtonInactive }