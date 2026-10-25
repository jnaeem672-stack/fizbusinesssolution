/**
 * Runs `cb` once, after the page has finished its first load and the browser is idle, or straight away
 * when the visitor first interacts (tap, click, key, scroll), whichever comes first.
 *
 * Used for code the first screen does not need (animation engine, floating buttons, cookie notice).
 * Loading it after the first paint keeps it out of the critical path that PageSpeed counts for
 * Largest Contentful Paint on mobile (T7, 25 Oct 2026). Any interaction loads it at once, so menus
 * and buttons still respond normally.
 */
export function afterFirstPaint(cb: () => void, minDelayMs = 1200): () => void {
  if (typeof window === 'undefined') return () => {};

  let done = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let idleId: number | undefined;
  const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

  const cleanup = () => {
    events.forEach((e) => window.removeEventListener(e, run));
    window.removeEventListener('load', onLoad);
    if (timer) clearTimeout(timer);
    if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
  };

  function run() {
    if (done) return;
    done = true;
    cleanup();
    cb();
  }

  function onLoad() {
    timer = setTimeout(() => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(run, { timeout: 2000 });
      else run();
    }, minDelayMs);
  }

  events.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  if (document.readyState === 'complete') onLoad();
  else window.addEventListener('load', onLoad, { once: true });

  return cleanup;
}
