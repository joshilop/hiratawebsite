import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Testimonails from './components/Testimonails'
import Contact from './components/Contact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const App = () => {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={recaptchaSiteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <div className='w-full overflow-hidden'>
        <ToastContainer/>
        <Navbar/>
        <Header/>
        <About/>
        <Projects/>
        {/*<Testimonails/>*/}
        <Contact/>
        <Footer/>
      </div>
    </GoogleReCaptchaProvider>
  )
}

export default App
