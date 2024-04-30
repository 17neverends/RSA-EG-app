import styles from './LinkButton.module.css';
import { Link } from 'react-router-dom';


export const LinkButton = ( {link, text} ) => {
    return (  
            <button type='button' className={styles.ExecuteButton} >
                <Link to={link} className={styles.linktext}>{text}</Link>
            </button>
    );
}
 