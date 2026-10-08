import { animate, stagger } from 'motion';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const filterBar = document.querySelector<HTMLElement>('[data-project-filters]');
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-filter]'));
const projectCards = Array.from(document.querySelectorAll<HTMLElement>('#personal-projects .project-card'));
const filterCount = document.querySelector<HTMLElement>('[data-filter-count]');
if (filterBar) filterBar.hidden = false;
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.projectFilter;
  filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  projectCards.forEach((card) => {
    card.hidden = filter !== 'all' && !card.dataset.projectCategories?.split(' ').includes(filter ?? '');
  });
  const visible = projectCards.filter((card) => !card.hidden);
  if (filterCount) filterCount.textContent = `${visible.length} / ${projectCards.length} ${filterCount.dataset.countLabel}`;
  if (!reduceMotion && visible.length) animate(visible, { opacity: [0, 1], y: [14, 0] }, { duration: 0.32, delay: stagger(0.035), ease: [0.22, 1, 0.36, 1] });
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
    if (!reduceMotion) animate(detailContent, { opacity: [0, 1], y: [16, 0] }, { duration: 0.3 });
  });
});
detailDialog?.querySelector('[data-detail-close]')?.addEventListener('click', () => detailDialog.close());
detailDialog?.addEventListener('click', (event) => {
  const bounds = detailDialog.getBoundingClientRect();
  if (event.target === detailDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) detailDialog.close();
});
detailDialog?.addEventListener('close', () => detailContent?.replaceChildren());

// A compact sticky header makes section state useful throughout the page.
const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-header a[href^="#"]'));
const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
const backToTop = document.querySelector<HTMLAnchorElement>('[data-back-to-top]');
backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  history.replaceState(null, '', '#main');
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
});
let navigationFrame = 0;
function updateNavigation() {
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
  document.querySelector('.site-header')?.classList.toggle('site-header-scrolled', window.scrollY > 80);
  if (backToTop) backToTop.hidden = window.scrollY < window.innerHeight;
}
window.addEventListener('scroll', () => {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}, { passive: true });
window.addEventListener('resize', updateNavigation, { passive: true });
updateNavigation();

const playground = document.querySelector<HTMLElement>('[data-hero-playground]');
const orbitButton = document.querySelector<HTMLButtonElement>('[data-orbit-play]');
if (playground && orbitButton) {
  let rotation = 0;
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  playground.addEventListener('pointermove', (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = playground.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      playground.style.setProperty('--pointer-x', `${pointerX}px`);
      playground.style.setProperty('--pointer-y', `${pointerY}px`);
      pointerFrame = 0;
    });
  });
  playground.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    playground.style.setProperty('--pointer-x', '0px');
    playground.style.setProperty('--pointer-y', '0px');
  });
  orbitButton.addEventListener('click', () => {
    rotation += 90;
    playground.style.setProperty('--orbit-turn', `${rotation}deg`);
    playground.classList.toggle('orbit-alternate');
  });
}
