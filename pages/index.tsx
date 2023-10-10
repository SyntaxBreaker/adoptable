import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function Home() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Adoptable</title>
        <meta name="description" content="Adoptable is a pet adoption platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['homepage']}>
        <form className={styles['homepage__form']} onSubmit={event => { event.preventDefault(); router.push(`/pets/${location}`) }}>
          <h2 className={styles['homepage__title']}>Find Your New Best Friend</h2>
          <input name='location' id='location' value={location} onChange={event => setLocation(event.target.value)} type='text' placeholder='Type your zip code or location to search for available pets' className={styles['homepage__input']} />
          <input type='submit' value='Find my new pet' className={`${styles['homepage__input']} ${styles['homepage__input--submit']}`} />
          <span className={styles['homepage__cta']}>OR</span>
          <input type='submit' value='Show all pets' className={`${styles['homepage__input']} ${styles['homepage__input--submit']} ${styles['homepage__input--secondary']}`} />
        </form>
      </main>
    </>
  )
}