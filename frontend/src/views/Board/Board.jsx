import { LabelMethod } from "../../components/LabelMethod/LabelMethod";
import styles from './Board.module.css'
import { MethodCard } from "../../components/MethodCard/MethodCard";
import { Quotes } from "../../components/Quotes/Quotes"; 

export const Board = ( {selectedMethod} ) => {

    const quotes = [
        "Час работы научит больше, чем день объяснения",
        "Практика без теории ценнее, чем теория без практики",
        "Теория – изучение правил. Практика – изучение исключений",
      ];

    return (  
        <div className={styles.boardDiv}>
            <div className={styles.labelsDiv}>
                <LabelMethod 
                    name="RSA"
                    selected={selectedMethod == "RSA" ? true : false}
                    link="/rsa"
                />
                <LabelMethod 
                    name="EG"
                    selected={selectedMethod == "EG" ? true : false}
                    link="/eg"
                />
            </div>
            <div className={styles.actionPeek}>
                <MethodCard 
                    name="Теория"
                    path="/theory.png"
                    link={`/${selectedMethod.toLowerCase()}/theory`}
                />
                <MethodCard 
                    name="Практика"
                    path="/practice.png"
                    link={`/${selectedMethod.toLowerCase()}/practice`}
                />
            </div>
            <Quotes
                quotes={quotes}
            />
        </div>
    );
}
 
