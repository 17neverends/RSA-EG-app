import { Link } from 'react-router-dom';
import styles from './MethodCard.module.css';

export const MethodCard = ({ name, path, link }) => {
    return (  
        <div className={styles.cardDiv}>
            <Link to={link} className={styles.cardTitle}>{name}</Link>
            <img className={styles.cardLogo} src={path} alt={name} />
        </div>
    );
}
