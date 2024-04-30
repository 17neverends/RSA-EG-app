import React from 'react';
import style from './Input.module.css';

export const Input = ({ value, placeholder, onChange }) => {
    const handleKeyPress = (event) => {
        if (!(event.charCode >= 48 && event.charCode <= 57)) {
            event.preventDefault(); 
        }
    };

    return (
        <input 
            className={style.inputcomp}
            type="text" 
            placeholder={placeholder}
            value={value} 
            onChange={onChange} 
            onKeyPress={handleKeyPress} 
        />
    );
};
