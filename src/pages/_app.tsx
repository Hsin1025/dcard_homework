import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps:{ session, pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SessionProvider>
  )
}

export default MyApp
