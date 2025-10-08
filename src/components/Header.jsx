import React from 'react'
import { motion } from 'framer-motion'
import headerImg from '../assets/header_img.png'
import OptimizedImage from './OptimizedImage'

const Header = () => {
  return (
    <div
      id="Header"
      className="relative min-h-screen mb-4 bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 md:bg-black/50" />

      {/* Contenido centrado */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-20 lg:px-32 text-white pt-24"
      >
        <h1 className="text-5xl sm:text-6xl md:text-[82px] max-w-3xl font-semibold drop-shadow-md md:drop-shadow-lg">
          Your home, our mission
        </h1>

        <div className="space-x-6 mt-16">
          <a
            href="#Projects"
            className="border border-white/90 text-white px-8 py-3 rounded hover:bg-white/10 transition"
          >
            Projects
          </a>
          <a
            href="#Contact"
            className="bg-yellow-600 px-8 py-3 rounded hover:bg-yellow-700 transition shadow"
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default Header
