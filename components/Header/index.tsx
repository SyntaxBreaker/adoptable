import styles from '../../styles/Header.module.scss';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles['header']}>
            <Link href='/' className={styles['header__title']}>Adoptable</Link>
            <Link href="/account" className={styles['header__link']}>Account</Link>
        </header>
    )
}