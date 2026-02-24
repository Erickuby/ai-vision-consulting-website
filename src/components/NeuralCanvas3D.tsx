import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Generate particle positions
  const [positions, connections] = useMemo(() => {
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    const connections: [number, number][] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Create connections to nearby particles
      for (let j = 0; j < i; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 4) {
          connections.push([i, j]);
        }
      }
    }

    return [positions, connections];
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length / 3; i++) {
      // Gentle floating animation
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * 0.3 + i * 0.2) * 0.002;
      positions[i3] += Math.cos(time * 0.2 + i * 0.3) * 0.001;

      // React to mouse
      const dx = mouse.current.x * 5 - positions[i3];
      const dy = mouse.current.y * 5 - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        positions[i3] -= (dx / dist) * 0.02;
        positions[i3 + 1] -= (dy / dist) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate camera based on scroll
    pointsRef.current.rotation.y = scroll.current * Math.PI * 0.2;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      
      {/* Connection lines */}
      {connections.slice(0, 30).map(([i, j], idx) => {
        const p1 = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
        const p2 = [positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]];
        
        return (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...p1, ...p2])}
                itemSize={3}
                args={[new Float32Array([...p1, ...p2]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} />
          </line>
        );
      })}
    </>
  );
}

export function NeuralCanvas3D() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
