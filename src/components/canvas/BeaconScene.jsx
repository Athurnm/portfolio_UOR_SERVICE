import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BeaconScene({ 
  scrollProgress = 0, 
  scrollVelocity = 0, 
  scrollDirection = 'idle' 
}) {
  const groupRef = useRef();
  const coreRef = useRef();
  const wireframeRef = useRef();
  const nodesRef = useRef();
  const pulseRingRef = useRef();

  // Interactive click pulse trigger state
  const [clickPulse, setClickPulse] = useState(0);

  // Velocity smoothing ref for natural momentum
  const smoothedVelocity = useRef(0);
  const clickEnergy = useRef(0);

  // Procedural orbital node positions
  const nodeCount = 36;
  const nodePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2.4 + Math.sin(i * 1.5) * 0.4;
      pos.push(new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ));
    }
    return pos;
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Directional multiplier: scrolling down accelerates forward, scrolling up reverses
    const dirFactor = scrollDirection === 'down' ? 1.4 : scrollDirection === 'up' ? -1.2 : 0;
    const targetVelocity = Math.min(scrollVelocity * dirFactor, 4.0);

    // Smooth dampening for buttery acceleration/deceleration
    smoothedVelocity.current = THREE.MathUtils.damp(
      smoothedVelocity.current,
      targetVelocity,
      5,
      delta
    );

    // Click pulse exponential decay
    clickEnergy.current = THREE.MathUtils.damp(clickEnergy.current, 0, 3, delta);

    // Base rotation + dynamic scroll-velocity boost + click energy
    const rotationStep = delta * (0.25 + smoothedVelocity.current * 0.9 + clickEnergy.current * 1.8);
    groupRef.current.rotation.y += rotationStep;

    // Pitch tilt responds to directional scroll (scroll down tilts forward, up tilts back)
    const targetTiltX = (scrollDirection === 'down' ? 0.22 : scrollDirection === 'up' ? -0.18 : 0) * Math.min(1, Math.abs(smoothedVelocity.current));
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(state.clock.elapsedTime * 0.3) * 0.12 + targetTiltX,
      4,
      delta
    );

    // Scale interpolates smoothly across page scroll progress
    const baseScale = THREE.MathUtils.lerp(1.0, 0.76, scrollProgress);
    const clickScaleBoost = clickEnergy.current * 0.15;
    groupRef.current.scale.setScalar(baseScale + clickScaleBoost);

    // Core pulsing & emissive reaction
    if (coreRef.current) {
      const idlePulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
      const energyPulse = 1 + clickEnergy.current * 0.25 + Math.abs(smoothedVelocity.current) * 0.08;
      coreRef.current.scale.setScalar(idlePulse * energyPulse);

      // Boost emissive glow when scrolling or clicked
      if (coreRef.current.material) {
        coreRef.current.material.emissiveIntensity = THREE.MathUtils.damp(
          coreRef.current.material.emissiveIntensity,
          1.2 + Math.abs(smoothedVelocity.current) * 0.35 + clickEnergy.current * 1.5,
          6,
          delta
        );
      }
    }

    // Outer wireframe counter-rotates for rich depth
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * (0.12 + smoothedVelocity.current * 0.3);
      wireframeRef.current.rotation.z += delta * 0.05;
    }

    // Pulse expanding sonar ring when clicked
    if (pulseRingRef.current) {
      const ringScale = THREE.MathUtils.lerp(0.8, 3.2, 1 - Math.min(1, clickEnergy.current));
      pulseRingRef.current.scale.setScalar(ringScale);
      if (pulseRingRef.current.material) {
        pulseRingRef.current.material.opacity = clickEnergy.current * 0.7;
      }
    }
  });

  const handlePointerDown = () => {
    clickEnergy.current = 1.0;
    setClickPulse(prev => prev + 1);
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      cursor="pointer"
    >
      {/* Glowing Inner Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#D97706"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Click-triggered Shockwave Ring */}
      <mesh ref={pulseRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.95, 32]} />
        <meshBasicMaterial 
          color="#FBBF24" 
          transparent 
          opacity={0} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Wireframe Icosahedron Neural Cage */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Orbit Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 64]} />
        <meshBasicMaterial color="#D97706" transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.2, 0.012, 16, 64]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} />
      </mesh>

      {/* Orbital Telemetry Nodes */}
      <group ref={nodesRef}>
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#FBBF24" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
