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
        {/* Botón flotante de WhatsApp */}
        <a
          href="https://wa.me/2566943650?text=Hi!%20I'd%20like%20to%20request%20an%20estimate%2C%20please."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[9999] animate-bounce"
        >
          <div className="bg-[#25D366] p-3 rounded-full shadow-2xl hover:scale-110 hover:brightness-110 transition-all duration-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-12 h-12"
            />
          </div>
        </a>


      </div>
    </GoogleReCaptchaProvider>
  )
}

export default App
