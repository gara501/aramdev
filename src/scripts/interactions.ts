import { animate, createSpring, utils } from 'animejs';
import { smoothScrollTo } from './smoothScroll';
import { animateLayout, animateDialogOpen, closeAnimatedDialog } from './uiAnimations';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const filterBar = document.querySelector<HTMLElement>('[data-project-filters]');
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-filter]'));
const projectCards = Array.from(document.querySelectorAll<HTMLElement>('#personal-projects .project-card'));
const filterCount = document.querySelector<HTMLElement>('[data-filter-count]');
if (filterBar) filterBar.hidden = false;
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.projectFilter;
  filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  animateLayout(document.querySelector('#personal-projects .project-gallery'), projectCards, () => {
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && !card.dataset.projectCategories?.split(' ').includes(filter ?? '');
    });
  });
  const visible = projectCards.filter((card) => !card.hidden);
  if (filterCount) filterCount.textContent = `${visible.length} / ${projectCards.length} ${filterCount.dataset.countLabel}`;
}));

const detailDialog = document.querySelector<HTMLDialogElement>('[data-detail-dialog]');
const detailContent = detailDialog?.querySelector<HTMLElement>('[data-detail-content]');
document.querySelectorAll<HTMLButtonElement>('[data-project-detail]').forEach((button) => {
  if (!detailDialog || !detailContent) return;
  button.hidden = false;
  button.addEventListener('click', () => {
    const template = document.getElementById(button.dataset.projectDetail ?? '');
    if (!(template instanceof HTMLTemplateElement)) return;
    detailContent.replaceChildren(template.content.cloneNode(true));
    const title = detailContent.querySelector('[data-detail-title]');
    if (title) title.id = 'project-detail-dialog-title';
    detailDialog.showModal();
    animateDialogOpen(detailDialog);
  });
});
detailDialog?.querySelector('[data-detail-close]')?.addEventListener('click', () => closeAnimatedDialog(detailDialog));
detailDialog?.addEventListener('click', (event) => {
  const bounds = detailDialog.getBoundingClientRect();
  if (event.target === detailDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeAnimatedDialog(detailDialog);
});
detailDialog?.addEventListener('close', () => detailContent?.replaceChildren());

// A compact sticky header makes section state useful throughout the page.
const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-header a[href^="#"]'));
const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
const backToTop = document.querySelector<HTMLAnchorElement>('[data-back-to-top]');
const desktopNav = document.querySelector<HTMLElement>('.desktop-nav');
const navIndicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
let indicatorSection = '';
backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  history.replaceState(null, '', '#main');
  smoothScrollTo(0);
});
let navigationFrame = 0;
function updateNavigation(force = false) {
  navigationFrame = 0;
  const marker = Math.min(window.innerHeight * 0.35, 220);
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  });
  sectionLinks.forEach((link) => {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (desktopNav && navIndicator && (force || indicatorSection !== (current?.id ?? ''))) {
    indicatorSection = current?.id ?? '';
    const active = desktopNav.querySelector<HTMLElement>('[aria-current="location"]');
    utils.remove(navIndicator);
    if (active) {
      const navBounds = desktopNav.getBoundingClientRect();
      const linkBounds = active.getBoundingClientRect();
      animate(navIndicator, { translateX: linkBounds.left - navBounds.left, width: linkBounds.width, opacity: 1, duration: reduceMotion ? 0 : 300, ease: 'outCubic' });
    } else animate(navIndicator, { opacity: 0, duration: reduceMotion ? 0 : 150 });
  }
  document.querySelector('.site-header')?.classList.toggle('site-header-scrolled', window.scrollY > 80);
  if (backToTop) backToTop.hidden = window.scrollY < window.innerHeight;
}
window.addEventListener('scroll', () => {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(() => updateNavigation());
}, { passive: true });
window.addEventListener('resize', () => updateNavigation(true), { passive: true });
void document.fonts.ready.then(() => updateNavigation(true));
updateNavigation();

document.querySelectorAll<HTMLDetailsElement>('.work-details').forEach((details) => {
  const summary = details.querySelector<HTMLElement>('summary');
  const content = details.querySelector<HTMLElement>('.work-details-content');
  const icon = summary?.querySelector<HTMLElement>('span');
  if (!summary || !content || !icon) return;
  let expanded = details.open;
  summary.addEventListener('click', (event) => {
    if (reduceMotion) return;
    event.preventDefault();
    expanded = !expanded;
    const height = details.open ? content.getBoundingClientRect().height : 0;
    const iconRotation = Number.parseFloat(String(utils.get(icon, 'rotate'))) || 0;
    utils.remove([content, icon]);
    details.open = true;
    content.style.height = `${height}px`;
    content.style.overflow = 'hidden';
    content.inert = !expanded;
    animate(icon, { rotate: [iconRotation, expanded ? 45 : 0], duration: 280, ease: 'outCubic' });
    // Native details may defer laying out newly opened content. Measure a
    // hidden copy outside its disclosure slot to get a reliable target height.
    const measure = content.cloneNode(true) as HTMLElement;
    measure.inert = true;
    measure.setAttribute('aria-hidden', 'true');
    Object.assign(measure.style, { position: 'absolute', visibility: 'hidden', height: 'auto', overflow: 'visible', width: `${details.getBoundingClientRect().width}px`, opacity: '1' });
    details.parentElement?.append(measure);
    const naturalHeight = measure.getBoundingClientRect().height;
    measure.remove();
    animate(content, { height: [height, expanded ? naturalHeight : 0], opacity: expanded ? 1 : 0, duration: 300, ease: 'inOutCubic', onComplete: () => {
      details.open = expanded;
      content.style.removeProperty('height');
      content.style.removeProperty('overflow');
      content.style.removeProperty('opacity');
      content.inert = false;
    } });
  });
});

const playground = document.querySelector<HTMLElement>('[data-hero-playground]');
const orbitButton = document.querySelector<HTMLButtonElement>('[data-orbit-play]');
if (playground && orbitButton) {
  let rotation = 0;
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const pointer = { x: 0, y: 0 };
  const orbit = { turn: 0 };
  const movePointer = () => {
    utils.remove(pointer);
    animate(pointer, { x: pointerX, y: pointerY, ease: createSpring({ duration: 450, bounce: 0.2 }), onUpdate: () => {
      playground.style.setProperty('--pointer-x', `${pointer.x}px`);
      playground.style.setProperty('--pointer-y', `${pointer.y}px`);
    } });
  };
  playground.addEventListener('pointermove', (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = playground.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      movePointer();
      pointerFrame = 0;
    });
  });
  playground.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pointerX = pointerY = 0;
    if (!reduceMotion) movePointer();
  });
  orbitButton.addEventListener('click', () => {
    rotation += 90;
    playground.classList.toggle('orbit-alternate');
    if (reduceMotion) { playground.style.setProperty('--orbit-turn', `${rotation}deg`); return; }
    utils.remove(orbit);
    animate(orbit, { turn: rotation, ease: createSpring({ duration: 750, bounce: 0.25 }), onUpdate: () => playground.style.setProperty('--orbit-turn', `${orbit.turn}deg`) });
    const logo = orbitButton.querySelector('img');
    if (logo) {
      utils.remove(logo);
      animate(logo, { scale: [0.94, 1], ease: createSpring({ duration: 500, bounce: 0.3 }), onComplete: () => logo.style.removeProperty('transform') });
    }
    const particles = playground.querySelectorAll<HTMLElement>('.orbit-particle');
    utils.remove(particles);
    particles.forEach((particle, index) => animate(particle, {
      translateX: playground.classList.contains('orbit-alternate') ? (index ? -45 : 45) : 0,
      translateY: playground.classList.contains('orbit-alternate') ? (index ? -70 : 70) : 0,
      ease: createSpring({ duration: 650, bounce: 0.25 }),
    }));
  });
}
