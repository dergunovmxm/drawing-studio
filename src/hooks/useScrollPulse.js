import { useEffect, useRef } from "react";

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export const useScrollPulse = ({
  delay = 2000,
  distance = 100,
  duration = 600,
  enabled = true,
} = {}) => {
  const cancelRef = useRef(() => {});
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  function animateScrollBy(delta, dur, onFinish) {
    const start = performance.now();
    const from = window.scrollY || window.pageYOffset;
    let rafId = null;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / dur);
      const eased = easeInOutQuad(progress);
      const current = from + delta * eased;
      window.scrollTo(0, current);
      if (progress < 1) rafId = requestAnimationFrame(step);
      else {
        rafId = null;
        if (onFinish) onFinish();
      }
    }

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }

  useEffect(() => {
    if (!enabled) return;
    let t1 = null;
    let cancelDown = null;
    let cancelUp = null;

    const startSequence = () => {
      cancelDown = animateScrollBy(distance, duration, () => {
        if (!mountedRef.current) return;
        cancelUp = animateScrollBy(-distance, duration);
        cancelRef.current = () => {
          if (cancelUp) cancelUp();
        };
      });
      cancelRef.current = () => {
        if (cancelDown) cancelDown();
        if (cancelUp) cancelUp();
      };
    };

    t1 = setTimeout(startSequence, delay);

    const cancelAll = () => {
      clearTimeout(t1);
      if (cancelRef.current) cancelRef.current();
    };

    window.addEventListener("wheel", cancelAll, { once: true, passive: true });
    window.addEventListener("touchstart", cancelAll, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", cancelAll, { once: true });

    return () => {
      clearTimeout(t1);
      if (cancelRef.current) cancelRef.current();
      window.removeEventListener("wheel", cancelAll);
      window.removeEventListener("touchstart", cancelAll);
      window.removeEventListener("keydown", cancelAll);
    };
  }, [delay, distance, duration, enabled]);
};
