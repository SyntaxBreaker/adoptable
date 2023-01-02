import styles from '../styles/Header.module.scss';

export default function Header() {
    return (
        <header className={styles['header']}>
            <h1 className={styles['header__title']}>Adoptable</h1>
            <a href="/account" className={styles['header__link']}>Account</a>
        </header>
    )
}