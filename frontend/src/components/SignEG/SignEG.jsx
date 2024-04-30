import React, { useState, useEffect } from 'react';
import styles from './SignEG.module.css';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { ExecuteButton } from '../ExecuteButton/ExecuteButton';
import { Status } from '../Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { Signature } from '../Signature/Signature';

const example = {
    "message": "Этот текст будет подписан"
};

export const SignEG = () => {
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setMessage('');
        } else {
            setMessage(example.message);
        }
    };

    useEffect(() => {
        let timer;
        if (showResult) {
            timer = setTimeout(() => {
                setShowResult(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showResult]);

    const getSign = async () => {
        try {
            const signature = {
                message: message
            };
            const response = await axios.post(`http://127.0.0.1:8000/sign/eg`, signature);
            if (response.status === 200 && response.data) {
                setSignature(response.data);
                setShowResult(false);
            } else {
                console.error('Ошибка при получении данных:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setSignature("Неверные входные данные");
            }
        }
    };

    const getVerify = async () => {
        try {
            const verify_data = {
                signature: signature,
                message: message
            };
            const response = await axios.post(`http://127.0.0.1:8000/verify/eg`, verify_data);
            if (response.status === 200 && response.data) {
                setResult(response.data);
                setShowResult(true); 
            } else {
                console.error('Ошибка при получении данных:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setResult("Неверные входные данные");
                setShowResult(true); 
            }
        }
    };

    return (
        <div className={styles.rsasigh}>
            <Textarea
                value={message}
                placeholder="Введите сообщение"
                onChange={(e) => setMessage(e.target.value) & setChecked(false)}
            />
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChangeCheckbox} color="default" />}
                label="Заполнить автоматически?"
            />
            <ExecuteButton
                text="Получить подпись"
                click={getSign}
            />
            {signature && (
                <Signature
                    sign={signature}
                />
            )}
            <Status 
                text={showResult ? result : ""}
            />
            {signature && !showResult ?
                <ExecuteButton
                    text="Проверить подпись"
                    click={getVerify}
                />
             : null}
        </div>
    );
};
