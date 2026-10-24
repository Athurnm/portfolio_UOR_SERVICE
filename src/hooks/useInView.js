import { useEffect, useRef, useState } from 'react';

/* One reveal per element, once. Motion rationale is in DESIGN.md Section 7.

   IntersectionObserver is the trigger. Three exits guarantee the element is
   never stranded invisible: already in view on mount, the observer callback,
   or the 1200ms fallback that Reveal also uses. The fallback only reveals what
   the user can actually see, so an off-screen heading still waits for the
   scroll instead of animating to nobody. */
export default function useInView({ rootMargin = '-5% 0px', threshold = 0, fallbackDelay = 1200 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        let settled = false;
        const show = () => {
            if (settled) return;
            settled = true;
            setInView(true);
        };

        const onScreen = () => {
            const rect = node.getBoundingClientRect();
            return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        };

        if (typeof IntersectionObserver === 'undefined') {
            show();
            return undefined;
        }

        if (onScreen()) {
            show();
            return undefined;
        }

        const fallback = window.setTimeout(() => {
            if (onScreen()) show();
        }, fallbackDelay);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        window.clearTimeout(fallback);
                        show();
                        observer.disconnect();
                    }
                });
            },
            { rootMargin, threshold }
        );

        observer.observe(node);

        return () => {
            window.clearTimeout(fallback);
            observer.disconnect();
        };
    }, [rootMargin, threshold, fallbackDelay]);

    return [ref, inView];
}
