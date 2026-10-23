import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BeaconScene({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const wireframeRef = useRef();
  const nodesRef = useRef();

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

    // Smooth subtle continuous rotation
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;

    // Scroll interpolation: scale and shift smoothly based on normalized scroll
    const targetScale = THREE.MathUtils.lerp(1.0, 0.75, scrollProgress);
    groupRef.current.scale.setScalar(targetScale);

    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
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
