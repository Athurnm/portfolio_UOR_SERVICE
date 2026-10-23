import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BeaconScene from './BeaconScene.jsx';
import BeaconPoster from './BeaconPoster.jsx';

export default function AmberBeaconCanvas({ scrollProgress = 0, className = '' }) {
  const [eligible, setEligible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Capability checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;

    // Check WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      hasWebGL = false;
    }

    if (hasWebGL && !prefersReducedMotion && !saveData) {
      setEligible(true);
    }
  }, []);

  if (!eligible || hasError) {
    return <BeaconPoster className={className} />;
  }

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <Suspense fallback={<BeaconPoster className={className} />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ powerPreference: 'high-performance', antialias: true }}
          onError={() => setHasError(true)}
          className="w-full h-full"
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#FBBF24" />
          <BeaconScene scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
}
