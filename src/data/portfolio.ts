export type Locale = 'en' | 'es';
import type { ImageMetadata } from 'astro';

import aiGlossary from '../assets/projects/aiGlossary.png';
import paranormis from '../assets/projects/paranormis.png';
import scifibooks from '../assets/projects/scifibooks.png';
import codefloor from '../assets/projects/codefloor.png';
import becas from '../assets/projects/becas.png';
import eartquake from '../assets/projects/eartquake.png';
import fractales from '../assets/projects/fractales.png';
import jung from '../assets/projects/jung.png';
import prfit from '../assets/projects/prfit.png';
import esotemaster from '../assets/projects/esotemaster.png';
import filosogame from '../assets/projects/filosogame.png';
import mathero from '../assets/projects/mathero.png';
import speedreader from '../assets/projects/speedreader.png';
import kairos from '../assets/projects/kairos.png';
import simonoverload from '../assets/projects/simonoverload.png';
import blockTower from '../assets/projects/blockTower.png';
import pong from '../assets/projects/pong.png';
import sneezyTyper from '../assets/projects/sneezyTyper.png';
import keyrythmy from '../assets/projects/keyrythmy.png';
import deliveryCastle from '../assets/projects/deliveryCastle.png';
import socio from '../assets/projects/socio.png';
import hugeadv from '../assets/projects/hugeadv.png';

export type PersonalProject = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  technologies: string[];
  github?: string;
  live?: string;
  image?: ImageMetadata;
};

export const professionalProjects: { name: string; image: string; url?: string; stack: string[] }[] = [
  { name: 'Choice Hotels', image: '/images/choice.png', url: 'https://www.choicehotels.com/', stack: ['AngularJS', 'Sass', 'Gulp', 'Sinon', 'Chai'] },
  { name: 'Google Chromebook', image: '/images/chromebooks.png', url: 'https://www.google.com/chromebook/', stack: ['JavaScript', 'Sass', 'Webpack'] },
  { name: 'Chrome Enterprise', image: '/images/chroment.png', url: 'https://chromeenterprise.google/', stack: ['JavaScript', 'Sass', 'Webpack'] },
  { name: 'Honda Build & Price', image: '/images/honda.png', url: 'https://automobiles.honda.com/tools/build-and-price', stack: ['Riot.js', 'Sass', 'Webpack'] },
  { name: 'The Keyword', image: '/images/keyw.png', url: 'https://blog.google/', stack: ['JavaScript', 'Python', 'Wagtail'] },
  { name: 'PGA Tour', image: '/images/pga.png', url: 'https://www.pgatour.com/', stack: ['React', 'Python', 'Contentful', 'GraphQL'] },
  { name: 'YouTube Blog', image: '/images/yt.png', url: 'https://blog.youtube/', stack: ['JavaScript', 'Python', 'Wagtail'] },
  { name: 'Disney Data', image: '/images/disney.png', stack: ['React', 'Tailwind CSS', 'Vite', 'Python', 'GraphQL'] },
];

export const personalProjects: PersonalProject[] = [
  {
    title: { en: 'Paranormis', es: 'Paranormis' },
    description: { en: 'A place to record and explore paranormal events.', es: 'Proyecto para registrar y explorar eventos paranormales.' },
    technologies: ['React', 'TanStack Query', 'Tailwind CSS', 'Sanity'],
    github: 'https://github.com/gara501/paranormis', live: 'https://paranormis.vercel.app/map', image: paranormis,
  },
  {
    title: { en: 'ScifiBooks', es: 'ScifiBooks' },
    description: { en: 'An exploration of the 100 greatest science fiction books of all time.', es: 'Una exploración de los 100 mejores libros de ciencia ficción de la historia.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Sanity', 'Supabase'],
    github: 'https://github.com/gara501/scifibooks', live: 'http://scifibooks.netlify.app/', image: scifibooks,
  },
  {
    title: { en: 'Codefloor', es: 'Codefloor' },
    description: { en: 'A library that generates interactive documentation for any code project.', es: 'Librería que genera documentación interactiva para cualquier proyecto de código.' },
    technologies: ['Python', 'React', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/gara501/codefloor', image: codefloor,
  },
  {
    title: { en: 'Becas', es: 'Becas' },
    description: { en: 'A guide to scholarships around the world available to applicants in Colombia.', es: 'Una guía de becas disponibles a nivel mundial para personas en Colombia.' },
    technologies: ['React', 'Vite', 'CSS Modules', 'Web scraping'],
    github: 'https://github.com/gara501/becas', live: 'https://atlasbecas.netlify.app/', image: becas,
  },
  {
    title: { en: 'AIGlossary', es: 'AIGlossary' },
    description: { en: 'An AI vocabulary guide with definitions and interactive examples.', es: 'Un glosario de inteligencia artificial con definiciones y ejemplos interactivos.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/gara501/iaglossary', live: 'https://gara501.github.io/iaglossary/', image: aiGlossary,
  },
  {
    title: { en: 'CameraPlanet', es: 'CameraPlanet' },
    description: { en: 'Defend Earth by moving a shield with your webcam.', es: 'Defiende la Tierra moviendo un escudo con la cámara web.' },
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS'],
    github: 'https://github.com/gara501/cameraplanet',
  },
  {
    title: { en: 'Equakes', es: 'Equakes' },
    description: { en: 'A 3D viewer for seismic activity.', es: 'Un visor en 3D de actividad sísmica.' },
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Motion'],
    github: 'https://github.com/gara501/equakes', live: 'https://equakesram.netlify.app/', image: eartquake,
  },
  {
    title: { en: 'Fractales', es: 'Fractales' },
    description: { en: 'An interactive space to explore and visualize fractals.', es: 'Un espacio interactivo para explorar y visualizar fractales.' },
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Motion', 'GLSL', 'Shaders'],
    github: 'https://github.com/gara501/amazonqchallenge', live: 'https://gara501.github.io/amazonqchallenge/', image: fractales,
  },
  {
    title: { en: 'The Mind of Jung', es: 'La mente de Jung' },
    description: { en: 'An interactive site in honor of Carl Jung.', es: 'Un sitio interactivo en honor a Carl Jung.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
    github: 'https://github.com/gara501/brainmap', live: 'https://mindjung.netlify.app/', image: jung,
  },
  {
    title: { en: 'Training Routine Manager', es: 'Administrador de rutinas de entrenamiento' },
    description: { en: 'A complete workspace for personal trainers to manage training routines.', es: 'Un sitio completo para que entrenadores personales controlen y administren rutinas de entrenamiento.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
    live: 'https://prfitram.vercel.app/', image: prfit,
  },
  {
    title: { en: 'Esotemaster', es: 'Esotemaster' },
    description: { en: 'An Ollama and RAG experience drawing on a collection of 72 esoteric books.', es: 'Una experiencia con Ollama y RAG basada en una colección de 72 libros esotéricos.' },
    technologies: ['React', 'Vite', 'Python', 'LangChain', 'Ollama', 'Tailwind CSS', 'Qdrant'],
    live: 'https://esotemaster.netlify.app', image: esotemaster,
  },
];

export const games: PersonalProject[] = [
  {
    title: { en: 'Filosogame', es: 'Filosogame' },
    description: { en: 'An interactive game of philosophical dilemmas.', es: 'Un juego interactivo de dilemas filosóficos.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Motion', 'Firebase'],
    github: 'https://github.com/gara501/filosogame', live: 'https://dilemafilo.netlify.app/', image: filosogame,
  },
  {
    title: { en: 'MathHero', es: 'MathHero' },
    description: { en: 'An interactive math game for learning the basics.', es: 'Un juego interactivo de matemáticas para aprender conceptos básicos.' },
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Motion'],
    github: 'https://github.com/gara501/mathhero', live: 'https://gara501.github.io/mathhero/', image: mathero,
  },
  {
    title: { en: 'Speedreader', es: 'Speedreader' },
    description: { en: 'A reading game to practice and improve reading speed.', es: 'Un juego de lectura rápida para mejorar la velocidad de lectura.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
    github: 'https://github.com/gara501/speedreader', live: 'https://gara501.github.io/speedreader/', image: speedreader,
  },
  {
    title: { en: 'Dilemas', es: 'Dilemas' },
    description: { en: 'A narrative game about moral choices and their consequences.', es: 'Un juego narrativo de dilemas morales y sus consecuencias.' },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    github: 'https://github.com/gara501/stories', live: 'https://kairoscol.netlify.app/', image: kairos,
  },
  {
    title: { en: 'Simon Overload', es: 'Simon Overload' },
    description: { en: 'A JavaScript game inspired by Simon Says.', es: 'Un juego en JavaScript inspirado en Simon Says.' },
    technologies: ['Vanilla JavaScript'],
    github: 'https://github.com/gara501/simonoverload', live: 'https://simonoverload.netlify.app/', image: simonoverload,
  },
];

export const otherGames: PersonalProject[] = [
  {
    title: { en: 'Breakable Blocks', es: 'Bloques eliminables' },
    description: { en: 'A breakable blocks game built with Three.js.', es: 'Un juego de bloques eliminables creado con Three.js.' },
    technologies: ['Three.js'], live: 'https://blocks-three-seven.vercel.app/', image: blockTower,
  },
  {
    title: { en: 'Pong', es: 'Pong' },
    description: { en: 'A take on the classic Pong game.', es: 'Una versión del clásico juego Pong.' },
    technologies: ['Vanilla JavaScript'], live: 'https://pongunp.netlify.app/', image: pong,
  },
  {
    title: { en: 'SneezyTyper', es: 'SneezyTyper' },
    description: { en: 'A fast typing game.', es: 'Un juego de escritura rápida.' },
    technologies: ['PhaserJS'], live: 'https://goramirez.itch.io/sneezytyper', image: sneezyTyper,
  },
  {
    title: { en: 'Keyry', es: 'Keyry' },
    description: { en: 'A rhythm game inspired by Dance Dance Revolution.', es: 'Un juego rítmico inspirado en Dance Dance Revolution.' },
    technologies: ['PhaserJS'], live: 'https://goramirez.itch.io/keyry', image: keyrythmy,
  },
  {
    title: { en: 'Space Runner', es: 'Space Runner' },
    description: { en: 'An infinite runner set in space.', es: 'Un infinite runner ambientado en el espacio.' },
    technologies: ['PhaserJS'], live: 'https://goramirez.itch.io/spacerunner',
  },
  {
    title: { en: 'Delivery Castle', es: 'Delivery Castle' },
    description: { en: 'A medieval delivery game.', es: 'Un juego de entregas medievales.' },
    technologies: ['PhaserJS', 'Cortex (Sol)'], live: 'https://goramirez.itch.io/delivery-castle', image: deliveryCastle,
  },
  {
    title: { en: 'Feed My Cat', es: 'Feed My Cat' },
    description: { en: 'Feed the cat while avoiding the traps.', es: 'Alimenta al gato sin caer en las trampas.' },
    technologies: ['PhaserJS', 'Cortex (Sol)'], live: 'https://goramirez.itch.io/feedmc',
  },
  {
    title: { en: 'Socio, garras codificadas', es: 'Socio, garras codificadas' },
    description: { en: 'A metroidvania style game.', es: 'Un juego de estilo metroidvania.' },
    technologies: ['Godot 4'], live: 'https://goramirez.itch.io/socio-garras-codificadas', image: socio,
  },
  {
    title: { en: 'Huge Adventure', es: 'Huge Adventure' },
    description: { en: 'A 2D game and early experiment in interactive storytelling.', es: 'Un juego 2D y un experimento temprano de narrativa interactiva.' },
    technologies: ['Unity 2D'], live: 'https://gara501.github.io/hugeAdventure/', image: hugeadv,
  },
];

export const experience = [
  {
    company: 'Globant',
    role: { en: 'Software Designer, AI Engineer', es: 'Software Designer, AI Engineer' },
    description: {
      en: 'Own technical quality across Disney account web initiatives: defining architecture, setting development standards and leading specification-driven development with AI harnesses (Claude) to deliver faster with reliable, reviewable code.',
      es: 'Responsable de la calidad técnica de las iniciativas web de la cuenta de Disney: defino arquitectura, establezco estándares de desarrollo y lidero el desarrollo guiado por especificaciones con harnesses de IA (Claude) para entregar más rápido con código confiable y revisable.',
    },
  },
  {
    company: 'Huge Inc.',
    role: { en: 'Senior Web Engineer', es: 'Ingeniero web sénior' },
    description: {
      en: 'Shipped high-traffic web experiences for Google — The Keyword, YouTube Blog, Chromebook and Chrome Enterprise — with JavaScript, Python, Wagtail, Django and AWS Lambda; also contributed to the PGA Tour platform with React and GraphQL.',
      es: 'Publiqué experiencias web de alto tráfico para Google — The Keyword, YouTube Blog, Chromebook y Chrome Enterprise — con JavaScript, Python, Wagtail, Django y AWS Lambda; además contribuí a la plataforma del PGA Tour con React y GraphQL.',
    },
  },
  {
    company: 'Prodigious',
    role: { en: 'Principal Front End', es: 'Líder de frontend' },
    description: {
      en: 'Led frontend delivery for global brands such as Honda, T-Mobile and Microsoft, building interactive experiences like Honda’s Build & Price configurator with React, Vue and Angular, and setting the team’s component architecture and code standards.',
      es: 'Lideré la entrega de frontend para marcas globales como Honda, T-Mobile y Microsoft, construyendo experiencias interactivas como el configurador Build & Price de Honda con React, Vue y Angular, y definiendo la arquitectura de componentes y los estándares de código del equipo.',
    },
  },
  {
    company: 'Zemoga',
    role: { en: 'Senior Backend Developer', es: 'Desarrollador backend sénior' },
    description: {
      en: 'Developed and maintained backend services for global digital campaigns and sites, primarily with .NET and PHP, and also Ruby on Rails — owning data integrations and CMS-driven content pipelines end to end.',
      es: 'Desarrollé y mantuve servicios backend para campañas y sitios digitales globales, principalmente con .NET y PHP, además de Ruby on Rails — responsable de las integraciones de datos y los pipelines de contenido basados en CMS de principio a fin.',
    },
  },
];

export const copy = {
  en: {
    title: 'Andrés Ramírez — Web Engineer & Creative Developer',
    description: 'Portfolio of Andrés Ramírez, a systems engineer building thoughtful web experiences and personal experiments.',
    skip: 'Skip to content',
    nav: { about: 'About', personal: 'Personal projects', work: 'Selected work', experience: 'Experience', contact: 'Contact' },
    menu: 'Menu',
    availability: 'Open to interesting conversations',
    intro: 'Hello, I’m',
    heroLine: 'I build for the web,',
    heroAccent: 'and beyond it.',
    heroDescription: 'I’m a systems engineer and full stack developer who enjoys the space between solid engineering and playful interaction.',
    explore: 'Explore my work',
    getInTouch: 'Get in touch',
    scroll: 'Scroll to explore',
    aboutKicker: '01 / The person behind the code',
    aboutTitle: 'Solid engineering, thoughtful experiences.',
    aboutBody: 'I’m Andrés Ramírez. My work moves between frontend engineering, backend systems and the small details that make a digital experience feel alive. I like working with animation, modern web frameworks and ideas that invite a little experimentation.',
    aboutAside: 'Frontend · Backend · Creative coding',
    portrait: 'Illustrated portrait',
    portraitHint: 'Illustrated portrait of Andrés Ramírez',
    personalKicker: '02 / After hours',
    personalTitle: 'Things I make for the fun of it.',
    personalDescription: 'Experiments, useful tools and games built beyond client work. A living collection of things I wanted to explore.',
    projectsGroup: 'Projects',
    gamesGroup: 'Games',
    otherGamesGroup: 'Other games',
    liveProject: 'Live project',
    sourceCode: 'Source code',
    screenshotOf: 'Screenshot of',
    viewProject: 'Open project',
    workKicker: '03 / Selected work',
    workTitle: 'Work out in the world.',
    workDescription: 'A selection of shipped websites and digital products I contributed to through my professional roles.',
    visitSite: 'Visit website',
    experienceKicker: '04 / Experience',
    experienceTitle: 'Where I’ve worked.',
    contactKicker: '05 / Say hello',
    contactTitle: 'Have something in mind?',
    contactBody: 'A project, an idea, or simply a good conversation about the web. My inbox is open.',
    emailMe: 'Send an email',
    footer: 'Designed & built by Andrés Ramírez',
    language: 'Switch to Spanish',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    backToTop: 'Back to top',
  },
  es: {
    title: 'Andrés Ramírez — Ingeniero web y desarrollador creativo',
    description: 'Portafolio de Andrés Ramírez, ingeniero de sistemas que crea experiencias web y proyectos personales.',
    skip: 'Saltar al contenido',
    nav: { about: 'Sobre mí', personal: 'Proyectos personales', work: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    menu: 'Menú',
    availability: 'Abierto a nuevas conversaciones',
    intro: 'Hola, soy',
    heroLine: 'Creo para la web,',
    heroAccent: 'y más allá.',
    heroDescription: 'Soy ingeniero de sistemas y desarrollador full stack. Me interesa el punto donde la ingeniería sólida se encuentra con la interacción creativa.',
    explore: 'Explorar proyectos',
    getInTouch: 'Hablemos',
    scroll: 'Desliza para explorar',
    aboutKicker: '01 / Detrás del código',
    aboutTitle: 'Ingeniería sólida, experiencias cuidadas.',
    aboutBody: 'Soy Andrés Ramírez. Mi trabajo se mueve entre la ingeniería frontend, los sistemas backend y los pequeños detalles que dan vida a una experiencia digital. Me gusta trabajar con animación, frameworks web e ideas que invitan a experimentar.',
    aboutAside: 'Frontend · Backend · Código creativo',
    portrait: 'Retrato ilustrado',
    portraitHint: 'Retrato ilustrado de Andrés Ramírez',
    personalKicker: '02 / Fuera de horario',
    personalTitle: 'Ideas que construyo por gusto.',
    personalDescription: 'Experimentos, herramientas útiles y juegos creados fuera del trabajo con clientes. Una colección viva de ideas que quise explorar.',
    projectsGroup: 'Proyectos',
    gamesGroup: 'Juegos',
    otherGamesGroup: 'Otros juegos',
    liveProject: 'Ver en vivo',
    sourceCode: 'Código fuente',
    screenshotOf: 'Captura de',
    viewProject: 'Abrir proyecto',
    workKicker: '03 / Trabajo seleccionado',
    workTitle: 'Proyectos en el mundo.',
    workDescription: 'Una selección de sitios y productos digitales publicados en los que contribuí desde mis roles profesionales.',
    visitSite: 'Visitar sitio',
    experienceKicker: '04 / Trayectoria',
    experienceTitle: 'Dónde he trabajado.',
    contactKicker: '05 / Hablemos',
    contactTitle: '¿Tienes algo en mente?',
    contactBody: 'Un proyecto, una idea o simplemente una buena conversación sobre la web. Mi correo está abierto.',
    emailMe: 'Enviar correo',
    footer: 'Diseñado y desarrollado por Andrés Ramírez',
    language: 'Cambiar a inglés',
    mainNavigation: 'Navegación principal',
    mobileNavigation: 'Navegación móvil',
    backToTop: 'Volver arriba',
  },
} as const;
