import { animate } from 'animejs';

let scrollAnimation: ReturnType<typeof animate> | undefined;

export function cancelSmoothScroll() {
  scrollAnimation?.pause();
  scrollAnimation = undefined;
}

export function smoothScrollTo(top: number, onComplete?: () => void) {
  cancelSmoothScroll();
  const start = window.scrollY;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const destination = Math.max(0, Math.min(top, max));
  const distance = destination - start;
  if (Math.abs(distance) < 1) {
    window.scrollTo({ top: destination, behavior: 'instant' });
    onComplete?.();
    return;
  }

  // Explicitly requested scroll animation also uses a brief transition when
  // the OS prefers reduced motion, instead of an abrupt section jump.
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 300
    : Math.min(1800, Math.max(900, Math.abs(distance) * 0.2));
  const position = { y: start };
  scrollAnimation = animate(position, {
    y: destination,
    duration,
    ease: 'inOutCubic',
    onUpdate: () => window.scrollTo({ top: position.y, behavior: 'instant' }),
    onComplete: () => {
      window.scrollTo({ top: destination, behavior: 'instant' });
      scrollAnimation = undefined;
      onComplete?.();
    },
  });
}

function focusDestination(target: HTMLElement) {
  const hadTabIndex = target.hasAttribute('tabindex');
  if (!hadTabIndex) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  if (!hadTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
}

// Prevent the browser's fragment jump; retain URLs, history and keyboard focus.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
  let id: string;
  try { id = decodeURIComponent(link.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target || target.hidden) return;
  event.preventDefault();
  const mobileMenu = link.closest('details');
  if (mobileMenu instanceof HTMLDetailsElement) mobileMenu.open = false;
  const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = id === 'main' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
  if (location.hash !== link.hash) history.pushState(null, '', link.hash);
  smoothScrollTo(top, () => focusDestination(target));
});

window.addEventListener('wheel', cancelSmoothScroll, { passive: true });
window.addEventListener('touchstart', cancelSmoothScroll, { passive: true });
window.addEventListener('pointerdown', cancelSmoothScroll, { passive: true });
window.addEventListener('popstate', cancelSmoothScroll);
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', ' '].includes(event.key)) cancelSmoothScroll();
});

const initialSection = document.documentElement.dataset.initialSection;
if (initialSection) {
  // All panels are initialized by the time this frame runs.
  void document.fonts.ready.then(() => requestAnimationFrame(() => {
    const target = document.getElementById(initialSection.slice(1));
    history.replaceState(history.state, '', initialSection);
    const previousRestoration = document.documentElement.dataset.scrollRestoration === 'manual' ? 'manual' : 'auto';
    const restoreHistory = () => {
      history.scrollRestoration = previousRestoration;
      delete document.documentElement.dataset.initialSection;
      delete document.documentElement.dataset.scrollRestoration;
    };
    if (!target) { restoreHistory(); return; }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - offset, () => {
      focusDestination(target);
      restoreHistory();
    });
    // Also restore browser history behavior if a visitor interrupts the arrival.
    window.setTimeout(restoreHistory, 2100);
  }));
}
