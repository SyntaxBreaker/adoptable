import styles from '../styles/404.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Custom404() {
    const router = useRouter();

    return (
        <div className={styles['error']}>
            <Image src="404.svg" width={350} height={350} alt='' />
            <h2 className={styles['error__heading']}>Oops! Page Not Found!</h2>
            <button className={styles['error__button']} onClick={() => router.push('/')}>Go Back</button>
        </div>
    )
}

export default Custom404;