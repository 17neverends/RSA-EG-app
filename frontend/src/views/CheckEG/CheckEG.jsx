import styles from './CheckEG.module.css';
import { Input } from '../../components/Input/Input';
import { ExecuteButton } from '../../components/ExecuteButton/ExecuteButton';
import { Status } from '../../components/Status/Status';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

const example = {
    "m": 8,
    "k": 13,
    "x": 3,
    "p": 23,
    "g": 5
};

export const CheckEG = () => {
    const [values, setValues] = useState({}); 
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

    const handleChange = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
        setChecked(false)
    };

    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setValues({});
        } else {
            setValues(example);
        }
    };

    const getCheck = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/check/eg`, { params: values });
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
            {Object.entries(example).map(([key], index) => (
                <Input
                    key={index}
                    value={values[key] || ''}
                    placeholder={`Введите ${key}`}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            ))}
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChangeCheckbox} color="default" />}
                label="Заполнить рандомным тесткейсом?"
            />

            <Status 
                text={showResult ? result : ""}
            />

            {!showResult && <ExecuteButton text="Проверить значения" click={getCheck} />}
        </div>
    );
}
