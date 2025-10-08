import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente de imagen optimizada con:
 * - Lazy loading
 * - Soporte WebP con fallback
 * - Imágenes responsivas
 * - Placeholder de carga
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '',
  priority = false,
  placeholder = 'blur',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef();

  // Generar versiones WebP y fallback
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // Si ya es WebP, devolver tal como está
    if (originalSrc.includes('.webp')) return originalSrc;
    
    // Generar versión WebP
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  };

  const getFallbackSrc = (originalSrc) => {
    if (!originalSrc) return '';
    return originalSrc;
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Cargar imagen cuando esté en vista
  useEffect(() => {
    if (!isInView) return;

    const webpSrc = getOptimizedSrc(src);
    const fallbackSrc = getFallbackSrc(src);

    // Detectar soporte WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // Usar WebP si es soportado, si no usar fallback
    const finalSrc = supportsWebP() ? webpSrc : fallbackSrc;
    
    // Precargar imagen
    const img = new Image();
    img.onload = () => {
      setImageSrc(finalSrc);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // Si WebP falla, usar fallback
      if (finalSrc.includes('.webp')) {
        setImageSrc(fallbackSrc);
        setIsLoaded(true);
      }
    };
    img.src = finalSrc;
  }, [isInView, src]);

  // Placeholder blur mientras carga
  const placeholderStyle = {
    backgroundColor: '#f3f4f6',
    backgroundImage: placeholder === 'blur' ? 
      `linear-gradient(45deg, #f9fafb 25%, transparent 25%), 
       linear-gradient(-45deg, #f9fafb 25%, transparent 25%), 
       linear-gradient(45deg, transparent 75%, #f9fafb 75%), 
       linear-gradient(-45deg, transparent 75%, #f9fafb 75%)` : 'none',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    filter: 'blur(5px)',
    transition: 'filter 0.3s ease',
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && isInView && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={placeholderStyle}
        />
      )}
      
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            ...props.style,
            objectFit: props.objectFit || 'cover',
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;