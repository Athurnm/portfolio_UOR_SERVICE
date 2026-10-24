import { useEffect } from 'react';

/* Traps Tab inside an open surface, closes on Escape, and returns focus to
   whatever opened it. Required by R-32 and promised in DESIGN.md Section 9. */
export default function useFocusTrap(active, ref, onClose) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;

    const node = ref.current;
    const previouslyFocused = document.activeElement;

    const focusable = () =>
      Array.from(
        node.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === node);

    const items = focusable();
    if (items.length > 0) items[0].focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const current = focusable();
      if (current.length === 0) return;

      const first = current[0];
      const last = current[current.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);

    return () => {
      node.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [active, ref, onClose]);
}
