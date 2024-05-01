import React, { useState, useEffect } from 'react';
import styles from './BigDataManualEG.module.css'
import { Input } from '../../components/Input/Input';
import { ExecuteButton } from '../../components/ExecuteButton/ExecuteButton';
import { Status } from '../../components/Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { Signature } from '../../components/Signature/Signature';

const exampleJSON = {
    "message": 177,
    "p": 7,
    "g": 3
};

export const BigDataManualEG = () => {
    const [message, setMessage] = useState('');
    const [p, setP] = useState('');
    const [g, setG] = useState('');
    const [signature, setSignature] = useState('');
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [publicKey, setPublicKey] = useState([]);

    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setMessage('');
            setP('');
            setG('');
            setSignature('');
            setResult('');
            setShowResult(false);
        } else {
            setMessage(exampleJSON.message);
            setP(exampleJSON.p);
            setG(exampleJSON.g);
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
                    message: message,
                    p: p,
                    g: g
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/sign/eg`, signature);
            if (response.status === 200 && response.data) {
                setPublicKey(response.data.public_key);
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
                    s1: signature[0],
                    s2: signature[1],
                    p: p,
                    g: g,
                    public: publicKey
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/verify/eg`, verify_data);
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
                placeholder="Введите сообщение (m)"
                onChange={(e) => setMessage(e.target.value) & setChecked(false)}
            />
            <Input
                value={p}
                placeholder="Введите простое число (p)"
                onChange={(e) => setP(e.target.value) & setChecked(false)}
            />
            <Input
                value={g}
                placeholder="Введите простое число (g)"
                onChange={(e) => setG(e.target.value) & setChecked(false)}
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
