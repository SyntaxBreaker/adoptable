import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  )
}