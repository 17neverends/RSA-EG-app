import styles from './PracticeBlock.module.css'
import { LabelMethod } from '../../components/LabelMethod/LabelMethod';
import { useState } from 'react';
import { SignRSA } from '../../components/SignRSA/SignRSA';
import { CheckRSA } from '../../components/CheckRSA/CheckRSA';
import { SignEG } from '../../components/SignEG/SignEG';
import { CheckEG } from '../../components/CheckEG/CheckEG';
import Switch from 'react-switch';



export const PracticeBlock = ({ method }) => {

    const isRSA = method === "RSA";
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
      setChecked(checked);
    };

    



    return (  
        <div className={styles.practice}>
            <div className={styles.headerTheory}>
                <p className={styles.theoryTitle}>Электронная цифровая подпись</p>
                <div className={styles.switchMethods}>
                    <LabelMethod 
                        name="RSA"
                        selected={isRSA ? true : false}
                        link="/rsa/practice"
                    />
                    <LabelMethod 
                        name="EG"
                        selected={isRSA ? false : true}
                        link="/eg/practice"
                    />
                </div>
                <div className={styles.chooseAction}>
                    <p className={styles.action}>Создание</p>
                    <Switch
                        onChange={handleChange}
                        checked={checked}
                        offColor="#666"
                        onColor="#666"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        activeBoxShadow="none"
                    />
                    <p className={styles.action}>Проверка</p>
                </div>
            </div>

            {isRSA && !checked ? <SignRSA/> : null}
            {isRSA && checked ? <CheckRSA/> : null}
            {!isRSA && !checked ? <SignEG/> : null}
            {!isRSA && checked ? <CheckEG/> : null}

        </div>
    );
}
 
