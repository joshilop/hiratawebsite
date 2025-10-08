#!/usr/bin/env node

/**
 * Script para optimizar imágenes existentes
 * Convierte JPG/PNG a WebP y comprime imágenes
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Configuración de optimización
const QUALITY = {
  webp: 75,
  jpeg: 75,
  png: { quality: 75, compressionLevel: 8 }
};

// Tamaños responsivos para imágenes grandes
const RESPONSIVE_SIZES = [
  { width: 400, suffix: '-sm' },
  { width: 800, suffix: '-md' },
  { width: 1200, suffix: '-lg' },
  { width: 1920, suffix: '-xl' }
];

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  console.log(`📸 Optimizando: ${filename}${ext}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Para imágenes grandes (header), crear versiones responsivas
    if (metadata.width > 1200) {
      console.log(`  🔄 Creando versiones responsivas...`);
      
      for (const size of RESPONSIVE_SIZES) {
        if (size.width < metadata.width) {
          // WebP version
          await image
            .resize(size.width)
            .webp({ quality: QUALITY.webp })
            .toFile(path.join(outputDir, `${filename}${size.suffix}.webp`));
          
          // JPG fallback
          await image
            .resize(size.width)
            .jpeg({ quality: QUALITY.jpeg, progressive: true })
            .toFile(path.join(outputDir, `${filename}${size.suffix}.jpg`));
        }
      }
    }

    // Versión WebP optimizada (tamaño original)
    await image
      .webp({ quality: QUALITY.webp })
      .toFile(path.join(outputDir, `${filename}.webp`));

    // Versión optimizada original
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(path.join(outputDir, `${filename}.jpg`));
    } else if (ext === '.png') {
      await image
        .png(QUALITY.png)
        .toFile(path.join(outputDir, `${filename}.png`));
    }

    console.log(`  ✅ Optimizado exitosamente`);

  } catch (error) {
    console.error(`  ❌ Error optimizando ${filename}: ${error.message}`);
  }
}

async function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Procesar subdirectorios
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      // Optimizar imagen
      const outputDir = path.join(dir, 'optimized');
      await optimizeImage(fullPath, outputDir);
    }
  }
}

async function main() {
  console.log('🚀 Iniciando optimización de imágenes...\n');
  
  // Optimizar imágenes en assets
  console.log('📁 Procesando src/assets/...');
  await processDirectory(ASSETS_DIR);
  
  // Optimizar imágenes en public
  console.log('\n📁 Procesando public/...');
  await processDirectory(PUBLIC_DIR);
  
  console.log('\n✅ ¡Optimización completada!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Revisa las carpetas "optimized" creadas');
  console.log('2. Reemplaza las imágenes originales con las optimizadas');
  console.log('3. Actualiza las rutas en el código si es necesario');
}

main().catch(console.error);