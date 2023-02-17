import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
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
        <h2 className={styles['homepage__title']}>Find Your New Best Friend</h2>
        <form className={styles['homepage__form']} onSubmit={event => { event.preventDefault(); router.push(`/pets/${zipCode}`) }}>
          <input name='zipcode' id='zipcode' value={zipCode} onChange={event => setZipCode(event.target.value)} type='number' placeholder='Type your zip code to search available pets' className={styles['homepage__input']} />
          <input type='submit' value='Find my new pet' className={`${styles['homepage__input']} ${styles['homepage__input--submit']}`} />
        </form>
      </main>
    </>
  )
}