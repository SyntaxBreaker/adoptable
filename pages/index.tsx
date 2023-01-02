import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.scss'

export default function Home() {
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
       <form className={styles['homepage__form']}>
          <input name='zipcode' id='zipcode' type='number' placeholder='Enter your zipcode to search Available Pets' className={styles['homepage__input']} />
          <input type='submit' value='Find my new pet' className={`${styles['homepage__input']} ${styles['homepage__input--submit']}`} />
       </form>
      </main>
    </>
  )
}