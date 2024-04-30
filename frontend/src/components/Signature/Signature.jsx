import React, { useRef, useEffect } from 'react';
import styles from './Signature.module.css';
import copy from 'clipboard-copy'; 

export const Signature = ({ sign }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [sign]);

    const handleCopy = () => {
        if (textareaRef.current) {
            copy(sign); 
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className={styles.inputcomp}
            value={sign}
            readOnly={true}
            onClick={handleCopy}
        />
    );
};
