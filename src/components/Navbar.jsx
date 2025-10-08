import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

useEffect(()=>{
    if(showMobileMenu){
        document.body.style.overflow = 'hidden'
    }else{
        document.body.style.overflow = 'auto'
    }
    return ()=>{
        document.body.style.overflow = 'auto'
    };
},[showMobileMenu])

// Effect para detectar scroll
useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY
        setIsScrolled(scrollTop > 50) // Cambiar después de 50px de scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
}, [])

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg backdrop-blur-sm border-b-4 border-yellow-600' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <div className={`container mx-auto flex justify-between items-center px-6 md:px-20 lg:px-32 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          <img
            src={isScrolled ? assets.logo : assets.logo_blanco}
            alt="logo"
            className={`w-auto cursor-pointer transition-all duration-300 object-cover ${
              isScrolled ? 'h-14 md:h-16' : 'h-14 md:h-18'
            }`}
            style={isScrolled ? {objectPosition: 'center top'} : {}}
          />
          <ul className={`hidden md:flex gap-7 transition-colors duration-300 ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>
              <li><a href="#Header" className={`cursor-pointer transition-colors duration-200 block ${
                isScrolled ? 'hover:text-yellow-600' : 'hover:text-gray-400'
              }`}>Home</a></li>
              <li><a href="#About" className={`cursor-pointer transition-colors duration-200 block ${
                isScrolled ? 'hover:text-yellow-600' : 'hover:text-gray-400'
              }`}>About</a></li>
              <li><a href="#Projects" className={`cursor-pointer transition-colors duration-200 block ${
                isScrolled ? 'hover:text-yellow-600' : 'hover:text-gray-400'
              }`}>Projects</a></li>
              <li><a href="#Contact" className={`cursor-pointer transition-colors duration-200 block ${
                isScrolled ? 'hover:text-yellow-600' : 'hover:text-gray-400'
              }`}>Contact</a></li>
          </ul>
          <button className={`hidden md:block px-8 py-2 rounded-full transition-all duration-200 ${
            isScrolled 
              ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}>Sign up</button>
          <img 
            onClick={()=> setShowMobileMenu(true)} 
            src={assets.menu_icon} 
            className={`md:hidden w-7 cursor-pointer hover:opacity-70 transition-all duration-200 ${
              isScrolled ? 'filter invert' : ''
            }`}
            alt="Menu" 
          />
        </div>
      </div>

      {/* --------- mobile-menu------ */}
      <div className={`md:hidden ${showMobileMenu ? 'fixed w-full h-full' : 'h-0 w-0'} right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`} style={{zIndex: 9999}}>
        <div className='flex justify-between items-center p-6'>
            <img 
              src={assets.logo} 
              alt="Hirata Remodeling Logo" 
              className="h-12 w-auto"
            />
            <img 
              onClick={()=> setShowMobileMenu(false)} 
              src={assets.cross_icon} 
              className='w-6 cursor-pointer hover:opacity-70 transition-opacity duration-200' 
              alt="Close menu" 
            />
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <li><a onClick={()=> setShowMobileMenu(false)} href="#Header" className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors duration-200 cursor-pointer'>Home</a></li>
            <li><a onClick={()=> setShowMobileMenu(false)} href="#About" className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors duration-200 cursor-pointer'>About</a></li>
            <li><a onClick={()=> setShowMobileMenu(false)} href="#Projects" className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors duration-200 cursor-pointer'>Projects</a></li>
            <li><a onClick={()=> setShowMobileMenu(false)} href="#Contact" className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 transition-colors duration-200 cursor-pointer'>Contact</a></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
