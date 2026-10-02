import { animate, inView, scroll, stagger } from 'motion';

const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-tab]'));
const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-project-panel]'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function activateTab(tab: HTMLButtonElement, updateUrl = false) {
  const activePanelId = tab.getAttribute('aria-controls');

  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== activePanelId;
  });

  const activePanel = panels.find((panel) => panel.id === activePanelId);
  if (activePanel && !prefersReducedMotion) {
    animate(activePanel, { opacity: [0, 1], y: [12, 0] }, { duration: 0.38, ease: [0.22, 1, 0.36, 1] });
  }

  if (updateUrl && activePanelId) {
    history.replaceState(null, '', `#${activePanelId}`);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab, true));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex], true);
  });
});

const tabFromHash = tabs.find((tab) => `#${tab.getAttribute('aria-controls')}` === location.hash);
if (tabFromHash) activateTab(tabFromHash);

window.addEventListener('hashchange', () => {
  const matchingTab = tabs.find((tab) => `#${tab.getAttribute('aria-controls')}` === location.hash);
  if (matchingTab) activateTab(matchingTab);
});

document.querySelectorAll<HTMLAnchorElement>('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.mobile-menu');
    if (menu instanceof HTMLDetailsElement) menu.open = false;
  });
});

if (!prefersReducedMotion) {
  const heroItems = document.querySelectorAll<HTMLElement>('.hero-copy > *');
  animate(heroItems, { opacity: [0, 1], y: [24, 0] }, {
    duration: 0.72,
    delay: stagger(0.09),
    ease: [0.22, 1, 0.36, 1],
  });

  inView('.section-label, .section-heading, .about-copy, .portrait-frame, .work-card, .experience-item, .contact-content, .project-card', (element) => {
    animate(element, { opacity: [0, 1], y: [28, 0] }, {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    });
  }, { margin: '0px 0px -10% 0px' });

  const progress = document.querySelector<HTMLElement>('.reading-progress');
  if (progress) scroll(animate(progress, { scaleX: [0, 1] }, { ease: 'linear' }));

  const hero = document.querySelector<HTMLElement>('.hero');
  const artwork = document.querySelector<HTMLElement>('.hero-art');
  if (hero && artwork) {
    scroll(animate(artwork, { y: [0, 70] }, { ease: 'linear' }), {
      target: hero,
      offset: ['start start', 'end start'],
    });
  }
}
