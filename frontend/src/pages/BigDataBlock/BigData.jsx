import styles from './BigData.module.css'
import { LabelMethod } from '../../components/LabelMethod/LabelMethod';
import { useState } from 'react';
import { BigDataManualRSA } from '../../views/BigDataManualRSA/BigDataManualRSA';
import Switch from 'react-switch';
import { BigDataPowRSA } from '../../views/BigDataPowRSA/BigDataPowRSA';
import { BigDataManualEG } from '../../views/BigDataManualEG/BigDataManualEG';
import { BigDataPowEg } from '../../views/BigDataPowEG/BigDataPowEG';



export const BigData = ({ method }) => {

    const isRSA = method === "RSA";
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
      setChecked(checked);
    };

    



    return (  
        <div className={styles.practice}>
            <div className={styles.headerTheory}>
                <p className={styles.theoryTitle}>Большие данные для создания ЭЦП</p>
                <div className={styles.switchMethods}>
                    <LabelMethod 
                        name="RSA"
                        selected={isRSA ? true : false}
                        link="/bigdata/rsa"
                    />
                    <LabelMethod 
                        name="EG"
                        selected={isRSA ? false : true}
                        link="/bigdata/eg"
                    />
                </div>
                <div className={styles.chooseAction}>
                    <p className={styles.action}>Ручной ввод</p>
                    <Switch
                        onChange={handleChange}
                        checked={checked}
                        offColor="#666"
                        onColor="#666"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        activeBoxShadow="none"
                    />
                    <p className={styles.action}>2<sup>n</sup>, n &ge; 64</p>
                </div>
            </div>

            {isRSA && !checked ? <BigDataManualRSA/> : null}
            {isRSA && checked ? <BigDataPowRSA/> : null}
            {!isRSA && !checked ? <BigDataManualEG/> : null}
            {!isRSA && checked ? <BigDataPowEg/> : null}


        </div>
    );
}
 
