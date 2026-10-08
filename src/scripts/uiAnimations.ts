import { animate, stagger, utils } from 'animejs';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const layouts = new WeakMap<HTMLElement, () => void>();

// Measure before and after a layout change; animate the visual difference.
export function animateLayout(container: HTMLElement | null, nodes: HTMLElement[], change: () => void) {
  if (!container) { change(); return; }
  layouts.get(container)?.();
  if (reducedMotion()) { change(); return; }
  const bounds = container.getBoundingClientRect();
  const before = new Map(nodes.filter((node) => !node.hidden).map((node) => [node, node.getBoundingClientRect()]));
  const copies = new Map(Array.from(before, ([node]) => [node, node.cloneNode(true) as HTMLElement]));
  change();
  const afterHeight = container.getBoundingClientRect().height;
  const ghosts: HTMLElement[] = [];
  const previousHeight = container.style.height;
  const previousOverflow = container.style.overflow;
  const previousPosition = container.style.position;
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.height = `${bounds.height}px`;

  for (const [node, rect] of before) {
    if (!node.hidden) continue;
    const ghost = copies.get(node)!;
    ghost.querySelectorAll('template').forEach((template) => template.remove());
    ghost.removeAttribute('id');
    ghost.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    ghost.inert = true;
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.add('layout-ghost');
    Object.assign(ghost.style, { position: 'absolute', left: `${rect.left - bounds.left}px`, top: `${rect.top - bounds.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, margin: '0', pointerEvents: 'none' });
    container.append(ghost);
    ghosts.push(ghost);
    animate(ghost, { opacity: [1, 0], scale: [1, 0.98], duration: 160, ease: 'outQuad' });
  }
  nodes.filter((node) => !node.hidden).forEach((node, index) => {
    const old = before.get(node);
    const next = node.getBoundingClientRect();
    animate(node, {
      translateX: [old ? old.left - next.left : 0, 0],
      translateY: [old ? old.top - next.top : 16, 0],
      opacity: [old ? 1 : 0, 1],
      duration: 340,
      delay: old ? 0 : Math.min(index * 25, 100),
      ease: 'outCubic',
    });
  });
  const cleanup = () => {
    utils.remove([container, ...nodes, ...ghosts]);
    ghosts.forEach((ghost) => ghost.remove());
    nodes.forEach((node) => { node.style.removeProperty('transform'); node.style.removeProperty('opacity'); });
    container.style.height = previousHeight;
    container.style.overflow = previousOverflow;
    container.style.position = previousPosition;
    layouts.delete(container);
  };
  layouts.set(container, cleanup);
  animate(container, { height: [bounds.height, afterHeight], duration: 460, ease: 'inOutCubic', onComplete: cleanup });
}

const closingDialogs = new WeakSet<HTMLDialogElement>();
export function animateDialogOpen(dialog: HTMLDialogElement) {
  closingDialogs.delete(dialog);
  utils.remove(dialog);
  if (reducedMotion()) return;
  animate(dialog, { opacity: [0, 1], translateY: [18, 0], scale: [0.985, 1], '--backdrop-opacity': [0, 1], duration: 280, ease: 'outCubic' });
  const content = dialog.querySelectorAll<HTMLElement>('.project-detail-image, .project-detail-copy > *, .project-lightbox-header, .project-lightbox-stage, .project-lightbox-footer');
  if (content.length) animate(content, { opacity: [0, 1], translateY: [10, 0], delay: stagger(22, { start: 50 }), duration: 250, ease: 'outCubic' });
}

export function closeAnimatedDialog(dialog: HTMLDialogElement) {
  if (!dialog.open || closingDialogs.has(dialog)) return;
  if (reducedMotion()) { dialog.close(); return; }
  closingDialogs.add(dialog);
  utils.remove(dialog);
  animate(dialog, { opacity: 0, translateY: 12, scale: 0.99, '--backdrop-opacity': 0, duration: 180, ease: 'inQuad', onComplete: () => dialog.close() });
}

document.querySelectorAll<HTMLDialogElement>('.project-detail-dialog, .project-lightbox').forEach((dialog) => {
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeAnimatedDialog(dialog); });
  dialog.addEventListener('close', () => {
    closingDialogs.delete(dialog);
    utils.remove(dialog);
    dialog.style.removeProperty('opacity');
    dialog.style.removeProperty('transform');
    dialog.style.removeProperty('--backdrop-opacity');
  });
});
