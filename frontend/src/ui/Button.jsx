import React, { useState } from 'react';
import './Button.css';

function Button({ label, onClick, status = null, disabled = false }) {
    const className = status ? status : '';
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

export default Button;
