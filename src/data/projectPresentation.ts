import type { Locale, PersonalProject } from './portfolio';

export const projectFilters = [
  { id: 'all', en: 'All', es: 'Todos' },
  { id: 'ai', en: 'AI', es: 'IA' },
  { id: 'tools', en: 'Tools', es: 'Herramientas' },
  { id: 'visual', en: 'Visualizations', es: 'Visualizaciones' },
] as const;

const presentation: Record<string, { categories: string[]; en: string; es: string }> = {
  Paranormis: { categories: ['visual'], en: 'Explore paranormal events through a map interface.', es: 'Explorar eventos paranormales a través de una interfaz de mapas.' },
  ScifiBooks: { categories: ['tools'], en: 'Discover a collection of 100 science fiction books.', es: 'Descubrir una colección de 100 libros de ciencia ficción.' },
  Codefloor: { categories: ['tools'], en: 'Turn code projects into interactive documentation.', es: 'Convertir proyectos de código en documentación interactiva.' },
  Becas: { categories: ['tools'], en: 'Explore international scholarships available to people in Colombia.', es: 'Explorar becas internacionales disponibles para personas en Colombia.' },
  AIGlossary: { categories: ['ai', 'tools'], en: 'Explain AI concepts with definitions and interactive examples.', es: 'Explicar conceptos de IA con definiciones y ejemplos interactivos.' },
  CameraPlanet: { categories: ['visual'], en: 'Use webcam movement as a game control.', es: 'Usar el movimiento frente a una cámara web como control de juego.' },
  Equakes: { categories: ['visual'], en: 'Explore seismic activity in a three-dimensional viewer.', es: 'Explorar la actividad sísmica en un visor tridimensional.' },
  Fractales: { categories: ['visual'], en: 'Explore fractals with Three.js, GLSL and shaders.', es: 'Explorar fractales con Three.js, GLSL y shaders.' },
  'The Mind of Jung': { categories: ['visual'], en: 'Explore an interactive tribute to Carl Jung.', es: 'Explorar un homenaje interactivo a Carl Jung.' },
  'Training Routine Manager': { categories: ['tools'], en: 'Provide a workspace for personal trainers to manage routines.', es: 'Ofrecer un espacio para que entrenadores personales administren rutinas.' },
  Esotemaster: { categories: ['ai', 'tools'], en: 'Explore a collection of 72 esoteric books with Ollama and RAG.', es: 'Explorar una colección de 72 libros esotéricos con Ollama y RAG.' },
};

export function describeProject(project: PersonalProject, locale: Locale) {
  const entry = presentation[project.title.en];
  return { categories: entry?.categories ?? [], focus: entry?.[locale] ?? project.description[locale] };
}

export const professionalContext: Record<string, { en: string; es: string }> = {
  'Choice Hotels': { en: 'Frontend work with AngularJS, Sass and Gulp, using Sinon and Chai for testing.', es: 'Trabajo frontend con AngularJS, Sass y Gulp, usando Sinon y Chai para pruebas.' },
  'Google Chromebook': { en: 'Web engineering for Google at Huge, working with JavaScript, Sass and Webpack.', es: 'Ingeniería web para Google en Huge, trabajando con JavaScript, Sass y Webpack.' },
  'Chrome Enterprise': { en: 'Web engineering for Google at Huge, working with JavaScript, Sass and Webpack.', es: 'Ingeniería web para Google en Huge, trabajando con JavaScript, Sass y Webpack.' },
  'Honda Build & Price': { en: 'Frontend delivery for the interactive Honda configurator at Prodigious.', es: 'Desarrollo frontend del configurador interactivo de Honda en Prodigious.' },
  'The Keyword': { en: 'Web engineering for Google at Huge, working with JavaScript, Python and Wagtail.', es: 'Ingeniería web para Google en Huge, trabajando con JavaScript, Python y Wagtail.' },
  'PGA Tour': { en: 'Contributed to the PGA Tour platform at Huge with React and GraphQL.', es: 'Contribuí a la plataforma del PGA Tour en Huge con React y GraphQL.' },
  'YouTube Blog': { en: 'Web engineering for Google at Huge, working with JavaScript, Python and Wagtail.', es: 'Ingeniería web para Google en Huge, trabajando con JavaScript, Python y Wagtail.' },
  'Disney Data': { en: 'Disney account work at Globant, where I lead technical quality, architecture and development standards.', es: 'Trabajo en la cuenta de Disney en Globant, donde lidero calidad técnica, arquitectura y estándares de desarrollo.' },
};
