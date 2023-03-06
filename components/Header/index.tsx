import { useState } from 'react';
import styles from '../../styles/Header.module.scss';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user, error, isLoading } = useUser();

    return (
        <header className={styles['header']}>
            <Link href='/' className={styles['header__title']}>Adoptable</Link>
            <button className={styles['header__button']} onClick={() => setIsOpen(!isOpen)}>&#9776;</button>
            <nav className={`${styles['header__menu']} ${isOpen && styles['header__menu--active']}`} onClick={() => setIsOpen(!isOpen)}>
                <Link href="/favorites" className={styles['header__link']}>Favorites</Link>
                {user ? (
                    <>
                        <Link href="/add" className={styles['header__link']}>Create</Link>
                        <Link href="/api/auth/logout" className={styles['header__link']}>Logout</Link>
                    </>
                ) : <Link href="/api/auth/login" className={styles['header__link']}>Login</Link>}
            </nav>
        </header>
    )
}