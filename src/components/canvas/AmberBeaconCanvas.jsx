import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BeaconScene from './BeaconScene.jsx';
import BeaconPoster from './BeaconPoster.jsx';

/* Loaded only through BeaconMount, which has already cleared WebGL,
   reduced-motion, saveData, and idle. This file owns three things: the theme
   signal that decides whether the core glows, viewport visibility, and failure. */
export default function AmberBeaconCanvas({ scrollProgress = 0 }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const readTheme = () => setGlow(document.documentElement.getAttribute('data-theme') === 'dark');
    readTheme();
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (failed) return <BeaconPoster />;

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<BeaconPoster />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.4], fov: 45 }}
          gl={{ powerPreference: 'high-performance', antialias: true }}
          frameloop={visible ? 'always' : 'never'}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={glow ? 0.5 : 0.95} />
          <pointLight position={[5, 5, 5]} intensity={glow ? 1.4 : 0.7} color="#F59E0B" />
          <BeaconScene scrollProgress={scrollProgress} glow={glow} />
        </Canvas>
      </Suspense>
    </div>
  );
}
