import React, { useEffect, useMemo, useState } from 'react';
import useInView from '../../hooks/useInView.js';

/* Counts every numeric token in a value string from 0 to its target, once, when
   the reading enters the viewport. The strings are not plain numbers, so the
   tokenizer keeps prefixes, suffixes, separators and decimals intact:
   `IDR 1.2B`, `5 -> 1 Day`, `+60%`, `11 to 34 GB`, `3x`.

   Accessibility: the animating spans are aria-hidden and the final string sits
   in an sr-only node, so a screen reader never hears an intermediate number.
   Motion rationale is in DESIGN.md Section 7. */

const NUMBER = /\d+(?:\.\d+)?/g;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Split a value string into literal text and numeric tokens. */
function tokenize(value) {
    const parts = [];
    const pattern = new RegExp(NUMBER.source, 'g');
    let cursor = 0;
    let match = pattern.exec(value);

    while (match !== null) {
        if (match.index > cursor) {
            parts.push({ text: value.slice(cursor, match.index) });
        }
        const raw = match[0];
        parts.push({
            target: Number.parseFloat(raw),
            decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
        });
        cursor = match.index + raw.length;
        match = pattern.exec(value);
    }

    if (cursor < value.length) parts.push({ text: value.slice(cursor) });
    return parts;
}

export default function CountUp({ value, className = '', style, duration = 1000 }) {
    const text = String(value ?? '');
    const parts = useMemo(() => tokenize(text), [text]);
    const hasNumbers = parts.some((part) => typeof part.target === 'number');
    const [ref, inView] = useInView();
    const [progress, setProgress] = useState(() => (hasNumbers ? 0 : 1));

    useEffect(() => {
        if (!inView) return undefined;

        if (!hasNumbers || prefersReducedMotion()) {
            setProgress(1);
            return undefined;
        }

        let frame = 0;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = Math.min(1, (now - start) / duration);
            setProgress(easeOut(elapsed));
            if (elapsed < 1) frame = window.requestAnimationFrame(tick);
        };

        frame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frame);
    }, [inView, duration, hasNumbers]);

    const rendered = parts
        .map((part) => {
            if (typeof part.target !== 'number') return part.text;
            return (part.target * progress).toFixed(part.decimals);
        })
        .join('');

    return (
        <span ref={ref} className={className} style={style}>
            <span aria-hidden="true">{rendered}</span>
            <span className="sr-only">{text}</span>
        </span>
    );
}
