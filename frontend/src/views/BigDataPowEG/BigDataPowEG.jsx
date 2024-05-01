import React, { useState, useEffect } from 'react';
import styles from './BigDataPowEG.module.css'
import { Input } from '../../components/Input/Input';
import { ExecuteButton } from '../../components/ExecuteButton/ExecuteButton';
import { Status } from '../../components/Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { Signature } from '../../components/Signature/Signature';

const exampleJSON = {
    "message": 128,
    "p": 128,
    "g": 64
};

export const BigDataPowEg = () => {
    const [message, setMessage] = useState('');
    const [p, setP] = useState('');
    const [g, setG] = useState('');
    const [s1, setS1] = useState('');
    const [s2, setS2] = useState('');
    const [signature, setSignature] = useState(s1, s2);
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [publicKey, setPublicKey] = useState('');

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
                    messagen: message,
                    pn: p,
                    gn: g,
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/sign/eg/pow`, signature);
            if (response.status === 200 && response.data) {
                setPublicKey(response.data.public);
                setS1(response.data.s1); 
                setS2(response.data.s2); 
                setSignature(`${response.data.s1}, ${response.data.s2}`)
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
                    messagen: message,
                    s1: s1,
                    s2: s2,
                    public: publicKey,
                    pn: p,
                    gn: g,
                }
            };
            console.log(message, s1, s1, publicKey, p, g)
            const response = await axios.get(`http://127.0.0.1:8000/bigdata/verify/eg/pow`, verify_data);
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
                value={p}
                placeholder="Введите степень p"
                onChange={(e) => setP(e.target.value) & setChecked(false)}
            />
            <Input
                value={g}
                placeholder="Введите степень g"
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
