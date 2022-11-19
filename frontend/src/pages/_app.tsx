import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bottom bg-none bg-no-repeat bg- lg:bg-black-900 mx-auto">
      <Component {...pageProps} />
    </div>
  )
  }
