import { animate, inView, scroll, stagger } from 'motion';
import './interactions';
import { animateLayout, animateDialogOpen, closeAnimatedDialog } from './uiAnimations';

const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-tab]'));
const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-project-panel]'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ease wheel input without changing native touch or nested scrolling.
if (!prefersReducedMotion) {
  const finePointer = window.matchMedia('(pointer: fine)');
  let wheelFrame = 0;
  let wheelTarget = window.scrollY;
  let wheelPosition = window.scrollY;
  let previousTime = 0;

  function stopWheelScroll() {
    cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
    previousTime = 0;
  }

  function easeWheelScroll(time: number) {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    wheelTarget = Math.max(0, Math.min(wheelTarget, maxScroll));
    const remaining = wheelTarget - wheelPosition;
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
    previousTime = time;
    const easing = 1 - Math.pow(0.82, elapsed / 16.67);

    // Keep fractional progress even when the browser rounds scroll positions.
    wheelPosition = Math.abs(remaining) < 1 ? wheelTarget : wheelPosition + remaining * easing;
    window.scrollTo({ top: wheelPosition, behavior: 'instant' });
    if (Math.abs(remaining) < 1) stopWheelScroll();
    else wheelFrame = requestAnimationFrame(easeWheelScroll);
  }

  window.addEventListener('wheel', (event) => {
    if (!finePointer.matches || !event.cancelable || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || document.querySelector('dialog[open]')) return;

    const nestedScroller = event.composedPath().some((node) => {
      if (!(node instanceof HTMLElement) || node === document.body || node === document.documentElement) return false;
      return node.scrollHeight > node.clientHeight && /auto|scroll/.test(getComputedStyle(node).overflowY);
    });
    if (nestedScroller) return;

    const delta = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (!wheelFrame) wheelTarget = wheelPosition = window.scrollY;
    const nextTarget = Math.max(0, Math.min(wheelTarget + delta, maxScroll));
    if (nextTarget === wheelTarget && !wheelFrame) return;
    event.preventDefault();
    wheelTarget = nextTarget;
    if (!wheelFrame) wheelFrame = requestAnimationFrame(easeWheelScroll);
  }, { passive: false });

  window.addEventListener('pointerdown', stopWheelScroll, { passive: true });
  window.addEventListener('touchstart', stopWheelScroll, { passive: true });
  window.addEventListener('hashchange', stopWheelScroll);
  window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) stopWheelScroll();
  });
}

const lightbox = document.querySelector<HTMLDialogElement>('[data-project-lightbox]');
const previewImage = lightbox?.querySelector<HTMLImageElement>('[data-preview-image]');
const previewTitle = lightbox?.querySelector<HTMLElement>('#project-preview-title');
const previewCount = lightbox?.querySelector<HTMLElement>('[data-preview-count]');
let activePreviews: HTMLAnchorElement[] = [];
let previewIndex = 0;

function renderPreview(index: number) {
  if (!activePreviews.length || !previewImage || !previewTitle || !previewCount) return;
  previewIndex = (index + activePreviews.length) % activePreviews.length;
  const link = activePreviews[previewIndex];
  previewImage.src = link.href;
  previewImage.alt = link.querySelector('img')?.alt ?? '';
  previewTitle.textContent = link.dataset.projectTitle ?? '';
  previewCount.textContent = `${String(previewIndex + 1).padStart(2, '0')} / ${String(activePreviews.length).padStart(2, '0')}`;
}

document.querySelectorAll<HTMLAnchorElement>('[data-project-preview]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!lightbox || !previewImage || !previewTitle || !previewCount || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const group = link.closest('[data-project-panel]');
    activePreviews = Array.from(group?.querySelectorAll<HTMLAnchorElement>('[data-project-preview]') ?? [link]).filter((preview) => !preview.closest('.project-card[hidden], .layout-ghost'));
    renderPreview(activePreviews.indexOf(link));
    lightbox.showModal();
    animateDialogOpen(lightbox);
  });
});

lightbox?.querySelector('[data-preview-close]')?.addEventListener('click', () => closeAnimatedDialog(lightbox));
lightbox?.querySelector('[data-preview-previous]')?.addEventListener('click', () => renderPreview(previewIndex - 1));
lightbox?.querySelector('[data-preview-next]')?.addEventListener('click', () => renderPreview(previewIndex + 1));
lightbox?.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  renderPreview(previewIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
lightbox?.addEventListener('click', (event) => {
  const bounds = lightbox.getBoundingClientRect();
  if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeAnimatedDialog(lightbox);
});
lightbox?.addEventListener('close', () => {
  previewImage?.removeAttribute('src');
  activePreviews = [];
});

function activateTab(tab: HTMLButtonElement, updateUrl = false, animateTransition = true) {
  const activePanelId = tab.getAttribute('aria-controls');

  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  const changePanel = () => panels.forEach((panel) => { panel.hidden = panel.id !== activePanelId; });
  if (animateTransition) animateLayout(document.querySelector('[data-project-panels]'), panels, changePanel);
  else changePanel();

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
    tabs[nextIndex].focus({ preventScroll: true });
    activateTab(tabs[nextIndex], true);
  });
});

const initialHash = document.documentElement.dataset.initialSection ?? location.hash;
const tabFromHash = tabs.find((tab) => `#${tab.getAttribute('aria-controls')}` === initialHash);
if (tabFromHash) {
  activateTab(tabFromHash, false, false);
  if (!document.documentElement.dataset.initialSection) requestAnimationFrame(() => document.getElementById(tabFromHash.getAttribute('aria-controls') ?? '')?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'instant' : 'smooth' }));
}

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

  inView('.section-label, .section-heading, .about-copy, .portrait-frame, .work-card, .experience-item, .contact-content', (element) => {
    animate(element, { opacity: [0, 1], y: [28, 0] }, {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    });
  }, { margin: '0px 0px -10% 0px' });

  inView('.footer-social', (element) => {
    animate(element.querySelectorAll('a'), { opacity: [0, 1], y: [18, 0] }, {
      duration: 0.5,
      delay: stagger(0.09),
      ease: [0.22, 1, 0.36, 1],
    });
  });

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
