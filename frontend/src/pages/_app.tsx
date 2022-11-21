import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-bottom bg-none bg-no-repeat bg- bg-black-900 text-white-900 mx-auto">
        <Header />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}
