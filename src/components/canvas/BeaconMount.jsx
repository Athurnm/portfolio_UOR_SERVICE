import React, { Suspense, lazy, useEffect, useState } from 'react';
import BeaconPoster from './BeaconPoster.jsx';

const AmberBeaconCanvas = lazy(() => import('./AmberBeaconCanvas.jsx'));

/* The only place the 3D chunk is requested. Four gates, then idle, then load.
   On any failure the poster stays and nothing else notices (DESIGN.md 4.2). */
export default function BeaconMount({ scrollProgress = 0 }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);

    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(
        window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (error) {
      webgl = false;
    }

    if (!webgl || reduce || saveData) return undefined;

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setShouldLoad(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => setShouldLoad(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldLoad) return <BeaconPoster />;

  return (
    <Suspense fallback={<BeaconPoster />}>
      <AmberBeaconCanvas scrollProgress={scrollProgress} />
    </Suspense>
  );
}
