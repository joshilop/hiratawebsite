import React, { useEffect, useState } from 'react'
import { assets, projectsData } from '../assets/assets'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage';

// ...existing code...
const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [popupImageIndex, setPopupImageIndex] = useState(0);

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardsToShow(projectsData.length);
            } else {
                setCardsToShow(1);
            }
        };
        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    // ESC para cerrar popup
    useEffect(() => {
        if (!popupOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") closePopup();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [popupOpen]);

    const nextProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    };
    const prevProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
    };

    const openPopup = (project) => {
        setSelectedProject(project);
        setPopupOpen(true);
        setPopupImageIndex(0);
    };
    const closePopup = () => {
        setPopupOpen(false);
        setSelectedProject(null);
        setPopupImageIndex(0);
    };

    // Navegación de imágenes en el popup
    const handlePrevImage = (e) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = selectedProject.images ? selectedProject.images : [selectedProject.image];
        setPopupImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    const handleNextImage = (e) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = selectedProject.images ? selectedProject.images : [selectedProject.image];
        setPopupImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
    <motion.div 
      initial={{opacity: 0, x:-200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
    className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden scroll-mt-20' id='Projects'>
      <h2 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Projects <span className="underline underline-offset-4 decoration-1 under font-light">Completed</span></h2>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Explore our completed projects showcasing excellence and expertise.</p>

    {/* slider buttons */}
    <div className='flex justify-end items-center mb-8'>
        <button onClick={prevProject}
        className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Project'>
            <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button onClick={nextProject}
        className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Project'>
            <img src={assets.right_arrow} alt="Next" />
        </button>
    </div>

    {/* project slider container */}
    <div className='overflow-hidden'>
        <div className='flex gap-8 transition-transform duration-500 ease-in-out'
        style={{transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`}}
        >
            {projectsData.map((project, index) => (
                <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4 cursor-pointer' onClick={() => openPopup(project)}>
                    <div className='w-full h-80 flex items-center justify-center rounded-lg shadow mb-14 overflow-hidden'>
                        <OptimizedImage 
                            src={project.images[0]} 
                            alt={`${project.title} - ${project.location}`}
                            className='w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300'
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>
                    <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                        <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                            <h3 className='text-xl font-semibold text-gray-800'>
                                {project.title}
                            </h3>
                            <p className='text-gray-500 text-sm'>
                                {project.price} <span className='px-1'>|</span> {project.location}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Popup modal */}
    {popupOpen && selectedProject && (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={closePopup}
            style={{cursor: 'pointer'}}
        >
            <div
                className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-8 relative flex flex-col items-center"
                onClick={e => e.stopPropagation()}
                style={{minHeight: '500px'}}
            >
                <button
                    className="absolute top-4 right-6 text-gray-500 hover:text-gray-800 text-3xl font-bold"
                    onClick={closePopup}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                <h3 className="text-3xl font-bold mb-4 text-center">{selectedProject.title}</h3>
                <p className="text-gray-500 text-center mb-6 text-lg">{selectedProject.price} | {selectedProject.location}</p>
                {/* Galería de imágenes con flechas */}
                 {/* Galería de imágenes con carrusel y flechas */}
                <div className="relative flex items-center justify-center w-full mb-6" style={{height: '350px'}}>
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 z-10"
                        onClick={handlePrevImage}
                        aria-label="Imagen anterior"
                        style={{boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
                    >
                        <img src={assets.left_arrow} alt="Anterior" className="w-6 h-6" />
                    </button>
                    <motion.div
                        key={popupImageIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="mx-auto rounded-lg shadow-lg w-full h-80 max-w-[90%]"
                        style={{maxHeight: '340px'}}
                    >
                        <OptimizedImage
                            src={(selectedProject.images ? selectedProject.images : [selectedProject.image])[popupImageIndex]}
                            alt={`${selectedProject.title} - Image ${popupImageIndex + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                            priority={true}
                            sizes="(max-width: 768px) 90vw, 70vw"
                        />
                    </motion.div>
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 z-10"
                        onClick={handleNextImage}
                        aria-label="Imagen siguiente"
                        style={{boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
                    >
                        <img src={assets.right_arrow} alt="Siguiente" className="w-6 h-6" />
                    </button>
                    {/* Indicador de imagen tipo carrusel */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                        {(selectedProject.images ? selectedProject.images : [selectedProject.image]).map((_, idx) => (
                            <button
                                key={idx}
                                className={`inline-block w-3 h-3 rounded-full ${idx === popupImageIndex ? 'bg-yellow-600' : 'bg-gray-300'}`}
                                style={{transition: 'background 0.2s'}}
                                onClick={() => setPopupImageIndex(idx)}
                                aria-label={`Ir a imagen ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
                {/* Descripción */}
                <p className="text-gray-700 text-center text-lg">{selectedProject.description}</p>
            </div>
        </div>
    )}
    </motion.div>
  )
}
// ...existing code...
export default Projects
