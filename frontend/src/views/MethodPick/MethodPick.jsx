import { MethodCard } from "../../components/MethodCard/MethodCard";
import styles from './MethodPick.module.css'

export const MethodPick = () => {
    return (  
        <div className={styles.methodPick}>
            <MethodCard 
                name="Rivest-Shamir-Adleman"
                path="/RSA.png"
                link="/rsa"
            />
            <MethodCard 
                name="ElGamal"
                path="/EG.png"
                link="/eg"
            />
            <MethodCard 
                name="RSA и EG для больших данных"
                path="/encryption.png"
                link="/bigdata/rsa"
            />
        </div>
    );
}
 
