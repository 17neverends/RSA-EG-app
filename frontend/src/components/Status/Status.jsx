import styles from './Status.module.css'

export const Status = ( {text, isVerify} ) => {
    return ( 
        <p className={styles.default}>{text}</p>
     );
}
 
