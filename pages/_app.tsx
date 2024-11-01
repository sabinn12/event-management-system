// app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header'; 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />  {/* Header with navigation */}
      <Component {...pageProps} />  {/* Dynamic page rendering based on route */}
    </>
  );
}
