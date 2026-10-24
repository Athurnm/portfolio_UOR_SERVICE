import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* A signal object, not a hero illustration. Rotation is slow enough to read as
   ambient, and the emissive core only glows in dark mode (DESIGN.md Section 5). */
export default function BeaconScene({ scrollProgress = 0, glow = false }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const cageRef = useRef(null);

  const nodeCount = 28;
  const nodePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodeCount; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2.35 + Math.sin(i * 1.5) * 0.35;
      positions.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.16;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(state.clock.elapsedTime * 0.25) * 0.1,
      3,
      delta
    );
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.82, scrollProgress));

    if (coreRef.current && coreRef.current.material) {
      const target = glow ? 1.15 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12 : 0.12;
      coreRef.current.material.emissiveIntensity = THREE.MathUtils.damp(
        coreRef.current.material.emissiveIntensity,
        target,
        4,
        delta
      );
    }

    if (cageRef.current) {
      cageRef.current.rotation.y -= delta * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial color="#D97706" emissive="#D97706" emissiveIntensity={glow ? 1.15 : 0.12} roughness={0.35} metalness={0.1} />
      </mesh>

      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#D97706" wireframe transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 12, 72]} />
        <meshBasicMaterial color="#D97706" transparent opacity={0.35} />
      </mesh>

      <group>
        {nodePositions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#B45309" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
