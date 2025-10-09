import logo from './logo.png'
import logo_dark from './logo_dark.svg'
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'
import left_arrow from './left_arrow.svg'
import right_arrow from './right_arrow.svg'
import header_img from './header_img.png'
import brand_img from './brand_img.webp'
import project_img_1 from './project_img_1.jpg'
import project_img_2 from './project_img_2.jpg'
import project_img_3 from './project_img_3.jpg'
import project_img_4 from './project_img_4.jpg'
import project_img_5 from './project_img_5.jpg'
import project_img_6 from './project_img_6.jpg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import project1_1 from './project1/project1_1.jpg'
import project1_2 from './project1/project1_2.jpg'
import project1_3 from './project1/project1_3.jpg'
import project1_4 from './project1/project1_4.jpg' 
import project1_5 from './project1/project1_5.jpg' 
import project2_1 from './project2/project2_1.jpg'
import project2_2 from './project2/project2_2.jpg'
import project3_1 from './project3/project3_1.jpg'
import project3_2 from './project3/project3_2.jpg'
import project3_3 from './project3/project3_3.jpg'
import project3_4 from './project3/project3_4.jpg'
import project4_1 from './project4/project4_1.JPG'
import project4_2 from './project4/project4_2.jpg'
import project4_3 from './project4/project4_3.jpg'
import project4_4 from './project4/project4_4.JPG'
import project4_5 from './project4/project4_5.jpg'
import project5_1 from './project5/project5_1.jpg'
import project5_2 from './project5/project5_2.jpg'
import project5_3 from './project5/project5_3.jpg'
import project5_4 from './project5/project5_4.jpg'
import project6_1 from './project6/project6_1.jpg'
import project6_2 from './project6/project6_2.jpg'
import project6_3 from './project6/project6_3.jpg'
import project6_4 from './project6/project6_4.jpg'
import project6_5 from './project6/project6_5.jpg'
import logo_blanco from './logo_blanco.png'

import { title } from 'framer-motion/client'

export const assets = {
    logo,
    logo_dark,
    logo_blanco,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    brand_img,
    project_img_1,
    project_img_2,
    project_img_3,
    project_img_4,
    project_img_5,
    project_img_6,
    project1_1,
    project1_2,
    project1_3,
    project1_4,
    project1_5,
    project2_1,
    project2_2,
    project3_1,
    project3_2,
    project3_3,
    project3_4,
    project4_1,
    project4_2,
    project4_3,
    project4_4,
    project4_5,
    project5_1,
    project5_2,
    project5_3,
    project5_4,
    project6_1,
    project6_2,
    project6_3,
    project6_4,
    project6_5,
    left_arrow,
    right_arrow,
}

// Agrupa las imágenes por proyecto
export const projectImages = {
  project1: [project1_1, project1_2, project1_3, project1_4, project1_5],
  project2: [project2_1, project2_2],
  project3: [project3_4,project3_2, project3_3, project3_1],
  project4: [project4_1, project4_2, project4_3, project4_4, project4_5],
  project5: [project5_1, project5_2, project5_3, project5_4],
  project6: [project6_1, project6_2, project6_3, project6_4, project6_5],
  // Puedes agregar más agrupaciones si tienes más imágenes por proyecto
}

// Actualiza projectsData para usar el array de imágenes
export const projectsData = [
    {
      title: "Painting Project",
      location: "Pulaski, TN",
      images: projectImages.project1,
      description: "Painting work performed by highly experienced professionals, covering all areas of the property with attention to detail and quality finishes."
    },
    {
      title: "New Deck Installation",
      location: "New Market, AL",
      images: projectImages.project2,
      description: "Installation of a new deck and painting services to enhance the outdoor living space, using durable materials and expert craftsmanship."
    },
    {
      title: "Framing Project",
      location: "Huntsville, AL",
      images: projectImages.project3,
      description: "Framing project completed in just one week by our skilled and dedicated team. The work was carried out efficiently and with great attention to detail, ensuring a solid and reliable structure for our client."
    },
    {
      title: "Remodeling Project",
      location: "Madison, AL",
      images: projectImages.project4,
      description: "Comprehensive remodeling services including kitchen and bathroom renovations, flooring installation, and custom carpentry to transform your space."
    },
    {
      title: "Flooring and Painting",
      location: "Athens, AL",
      images: projectImages.project5,
      description: "Professional flooring installation and painting services to refresh and enhance the aesthetic of your home or business."
    },
    {
      title: "Inside Painting",
      location: "Huntsville, AL",
      images: projectImages.project6,
      description: "Interior painting services to revitalize your living or working space, using high-quality paints and expert techniques for a flawless finish."
    }
    // Si tienes más proyectos, agrégalos aquí
];

export const testimonialsData = [
    {
        name: "Donald Jackman",
        title: "Marketing Manager",
        image: profile_img_1,
        alt: "Portrait of Donald Jackman",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Richard Nelson",
        title: "UI/UX Designer",
        image: profile_img_2,
        alt: "Portrait of Richard Nelson",
        rating: 4,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "James Washington",
        title: "Co-Founder",
        image: profile_img_3,
        alt: "Portrait of James Washington",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    }
];