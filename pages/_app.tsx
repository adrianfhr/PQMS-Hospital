import type { AppProps } from 'next/app'
import '@src/styles/global.css'
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <>
    <Component {...pageProps} />
    <ToastContainer autoClose={1500} /> 
  </>
}

export default App
