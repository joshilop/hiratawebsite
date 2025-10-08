import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="About" className="relative overflow-hidden bg-white">
      {/* Curva superior */}
      <svg
        className="absolute top-0 left-0 w-full h-[100px] md:h-[140px] rotate-180 text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,48 C240,144 480,0 720,48 C960,96 1200,24 1440,96 L1440,120 L0,120 Z"
        />
      </svg>

      {/* Contenido principal con animación */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden relative z-10"
      >
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">
          About{' '}
          <span className="underline underline-offset-4 decoration-1 under font-light">
            Our Brand
          </span>
        </h1>
        <p className="text-gray-500 max-w-80 text-center mb-8">
          Serving Huntsville & surrounding areas
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
          {/* Imagen de la marca */}
          <div className="relative w-full sm:w-1/2 max-w-lg">
            <img
              src={assets.brand_img}
              alt="About our brand"
              className="w-full max-h-[400px] md:max-h-[450px] lg:max-h-[500px] rounded-lg shadow-lg object-cover"
            />

            {/* Overlay sutil para oscurecer ligeramente los bordes */}
            <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none" />
          </div>

          {/* Texto descriptivo */}
          <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
            <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
              <div>
                <p className="text-4xl font-medium text-gray-800">10+</p>
                <p>Years of Excellence</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-gray-800">12+</p>
                <p>Projects Completed</p>
              </div>
            </div>

            <p className="my-10 max-w-lg leading-relaxed">
              We believe that every home deserves quality, functionality, and
              beauty. With years of experience in remodeling and custom
              construction, our mission is to transform spaces into something
              you're proud to call home. We combine craftsmanship, reliable
              materials, and modern design to deliver lasting results that
              exceed expectations. From kitchens and bathrooms to complete
              renovations, we handle every project with dedication, precision,
              and care.
            </p>

            <button className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
