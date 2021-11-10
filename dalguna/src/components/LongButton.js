import React, { useState } from 'react';
import '../long_button.css';

function LongButtonActive() {
    return (
        <a href="#" className="longButtonActive">
            <span className="longButtonActive__text"> BUTTON </span>
        </a>
    )
}

function LongButtonInactive() {
    return (
        <a href="#" className="longButtonInactive">
            <span className="longButtonInactive__text"> BUTTON </span>
        </a>
    )
}

export { LongButtonActive, LongButtonInactive }