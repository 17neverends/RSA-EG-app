import styles from './CheckRSA.module.css';
import { Input } from '../Input/Input';
import { ExecuteButton } from '../ExecuteButton/ExecuteButton';
import { Status } from '../Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

const example = {
    "m": [13, 11, 5],
    "e": 7,
    "n": 77,
    "s": [41, 28, 26],
};

export const CheckRSA = () => {
    const [message, setMessage] = useState('');
    const [exp, setExp] = useState('');
    const [size, setSize] = useState('');
    const [sign, setSign] = useState('');
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        let timer;
        if (showResult) {
            timer = setTimeout(() => {
                setShowResult(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showResult]);


    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setMessage('');
            setExp('');
            setSize('');
            setSign('');
        } else {
            const randomIndex = Math.floor(Math.random() * example.m.length);
            setMessage(example.m[randomIndex]);
            setExp(example.e);
            setSize(example.n);
            setSign(example.s[randomIndex]);
        }
    };


    const getCheck = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/check/rsa?m=${message}&e=${exp}&n=${size}&s=${sign}`);
            if (response.status === 200 && response.data) {
                setResult(response.data); 
                setShowResult(true);
            } else {
                console.error('Ошибка при получении данных:', response);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setResult("Неверные входные данные"); 
            }
        }
    };

    return (
        <div className={styles.rsasigh}>
            <Input
                value={exp}
                placeholder="Введите публичную экспоненту (e)"
                onChange={(e) => setExp(e.target.value) & setChecked(false)}
            /> 
            <Input
                value={size}
                placeholder="Введите размер ключа (n)"
                onChange={(e) => setSize(e.target.value) & setChecked(false)}
            />
            <Input
                value={message}
                placeholder="Введите сообщение (m)"
                onChange={(e) => setMessage(e.target.value) & setChecked(false)}
            />
            <Input
                value={sign}
                placeholder="Введите подпись (s)"
                onChange={(e) => setSign(e.target.value) & setChecked(false)}
            />
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChangeCheckbox} color="default" />}
                label="Заполнить рандомным тесткейсом?"
            />

            <Status 
                text={showResult ? result : ""}
            />

            {!showResult ? <ExecuteButton text="Проверить значения" click={getCheck} /> : null}
        </div>
    );
}
