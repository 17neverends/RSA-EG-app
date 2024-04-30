import React, { useState, useEffect } from 'react';
import styles from './BigDataPowRSA.module.css'
import { Input } from '../Input/Input';
import { ExecuteButton } from '../ExecuteButton/ExecuteButton';
import { Status } from '../Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { Signature } from '../Signature/Signature';

const exampleJSON = {
    "message": 128,
    "exp": 128,
    "size": 64
};

export const BigDataPowRSA = () => {
    const [message, setMessage] = useState('');
    const [exp, setExp] = useState('');
    const [size, setSize] = useState('');
    const [signature, setSignature] = useState('');
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [publicKey1, setPublicKey1] = useState('');
    const [publicKey2, setPublicKey2] = useState('');

    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setMessage('');
            setExp('');
            setSize('');
            setSignature('');
            setResult('');
            setShowResult(false);
        } else {
            setMessage(exampleJSON.message);
            setExp(exampleJSON.exp);
            setSize(exampleJSON.size);
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
                params: {
                    messagen: message,
                    pn: exp,
                    qn: size,
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/sign/rsa/pow`, signature);
            if (response.status === 200 && response.data) {
                setPublicKey1(response.data.p1);
                setPublicKey2(response.data.p2);
                setSignature(response.data.signature); 
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
                params: {
                    message: message,
                    signature: signature,
                    p1: publicKey1,
                    p2: publicKey2
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/verify/rsa/pow`, verify_data);
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
            <Input
                value={message}
                placeholder="Введите степень для сообщения (m)"
                onChange={(e) => setMessage(e.target.value) & setChecked(false)}
            />
            <Input
                value={exp}
                placeholder="Введите степень для публичной экспоненты (e)"
                onChange={(e) => setExp(e.target.value) & setChecked(false)}
            />
            <Input
                value={size}
                placeholder="Введите степень для размера ключа (n)"
                onChange={(e) => setSize(e.target.value) & setChecked(false)}
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
