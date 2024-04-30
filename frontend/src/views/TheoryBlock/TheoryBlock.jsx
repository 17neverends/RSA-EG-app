import styles from './TheoryBlock.module.css'
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { LabelMethod } from '../../components/LabelMethod/LabelMethod';


export const TheoryBlock = ({ method }) => {
    const isRSA = method === "RSA";
    
    return (
        <div className={styles.theoryBlock}>
            <div className={styles.headerTheory}>
                <p className={styles.theoryTitle}>Электронная цифровая подпись</p>
                <div className={styles.switchMethods}>
                    <LabelMethod 
                        name="RSA"
                        selected={isRSA ? true : false}
                        link="/rsa/theory"
                    />
                    <LabelMethod 
                        name="EG"
                        selected={isRSA ? false : true}
                        link="/eg/theory"
                    />
                </div>
            </div>
            <div className={styles.theoryText}>
                <ol>
                    <li><p className={styles.point}>Генерация ключей:</p>
                        <ul className={styles.list}>
                            {isRSA && <li>Выберите два простых числа p и q.</li>}
                            {isRSA && <li>Вычислите их произведение n: n = p * q.</li>}
                            {isRSA && <li>Вычислите значение функции Эйлера от n: φ(n) = (p-1) * (q-1).</li>}
                            {isRSA && <li>Выберите целое число e, которое удовлетворяет условиям: 1 &lt; e &lt; φ(n) и НОД(e, φ(n)) = 1.</li>}
                            {!isRSA && <li>Выберите большое простое число p.</li>}
                            {!isRSA && <li>Найдите примитивный корень по модулю p (g).</li>}
                            {!isRSA && <li>Выберите случайное целое число x, такое что 1 &lt; x &lt; p-1.</li>}
                            {!isRSA && <li>Вычислите y = g^x mod p.</li>}
                            <li>Найдите число d, обратное e по модулю φ(n) (для RSA) или по модулю p-1 (для Эль-Гамаля).</li>
                            {isRSA && <li>Публичный ключ: (n, e), приватный ключ: (n, d).</li>}
                            {!isRSA && <li>Публичный ключ: (p, g, y), приватный ключ: d.</li>}
                        </ul>
                    </li>
                    <li><p className={styles.point}>Шифрование:</p>
                        <ul className={styles.list}>
                            <li>Представьте сообщение как целое число m, где 0 &lt; m &lt; n (для RSA) или 0 &lt; m &lt; p (для Эль-Гамаля).</li>
                            {isRSA && <li>Зашифруйте сообщение с использованием публичного ключа: c ≡ m^e (mod n).</li>}
                            {!isRSA && <li>Выберите случайное целое число k из промежутка [1, p-2].</li>}
                            {!isRSA && <li>Вычислите r = g^k mod p и c_1 = y^k mod p.</li>}
                            {!isRSA && <li>Зашифруйте сообщение m как c_2 = m * c_1 mod p.</li>}
                        </ul>
                    </li>
                    <li><p className={styles.point}>Дешифрование:</p>
                        <ul className={styles.list}>
                            <li>Полученное зашифрованное сообщение c.</li>
                            {isRSA && <li>Расшифруйте его с использованием приватного ключа: m ≡ c^d (mod n).</li>}
                            {!isRSA && <li>Вычислите общий секретный ключ: s = r^d mod p.</li>}
                            {!isRSA && <li>Найдите обратный элемент к s по модулю p: s_inv = s^(-1) mod p.</li>}
                            {!isRSA && <li>Расшифруйте сообщение: M = (c_2 * s_inv) mod p.</li>}
                        </ul>
                    </li>
                </ol>
            </div>
            <LinkButton
                link={`/${method.toLowerCase()}/practice`}
                text={`Перейти к практике по ${method.toLowerCase()}`}
            />
        </div>
    );
}
