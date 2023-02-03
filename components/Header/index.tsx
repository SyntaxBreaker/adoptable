import styles from '../../styles/Header.module.scss';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Header() {
    const { user, error, isLoading } = useUser();

    return (
        <header className={styles['header']}>
            <Link href='/' className={styles['header__title']}>Adoptable</Link>
            {user ? (
                <div className={styles['header__links']}>
                    <Link href="/account" className={styles['header__link']}>Account</Link>
                    <Link href="/api/auth/logout" className={styles['header__link']}>Logout</Link>
                </div>
            ) : <Link href="/api/auth/login" className={styles['header__link']}>Login</Link>}
        </header>
    )
}