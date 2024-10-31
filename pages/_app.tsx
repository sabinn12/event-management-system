import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header'; // Import your header
import Home from '../components/home';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />  {/* Header with navigation */}
      <Home />
    </>
  );
}
