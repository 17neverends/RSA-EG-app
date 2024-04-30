import styles from './LabelMethod.module.css'
import { Link } from 'react-router-dom';

export const LabelMethod = ( {name, selected, link} ) => {
    return ( 
        <div className={selected ? `${styles.selectedLabel} ${styles.label}` : styles.label}>
            <Link to={link} className={styles.labelP}>Алгоритм {name}</Link>
        </div>
     );
}
 
