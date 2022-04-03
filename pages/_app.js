// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { Navbar } from '../components/navbar'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return <>
    <Navbar/>
    <div className="content-container" >
      <Component {...pageProps} />
    </div>
  </>;
}

export default MyApp
