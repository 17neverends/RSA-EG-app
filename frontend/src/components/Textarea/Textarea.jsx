import React from 'react';
import style from './Textarea.module.css'

export const Textarea = ({ value, placeholder, onChange }) => {
    return (
        <textarea 
            rows={10}
            className={style.inputcomp}
            type="text" 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
        />
    );
}