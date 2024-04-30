import styles from './ExecuteButton.module.css'

export const ExecuteButton = ( {click, text} ) => {
    return (  
        <div>
            <button type='button' className={styles.ExecuteButton} onClick={click}>{text}</button>
        </div>
    );
}
 