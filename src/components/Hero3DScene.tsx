import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

// ── Central brain-like geometry ─────────────────────────────────────────────
function BrainCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRot.current.x = (e.clientY / window.innerHeight - 0.5) * 0.8;
      targetRot.current.y = (e.clientX / window.innerWidth - 0.5) * 1.2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3 + (targetRot.current.y - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (targetRot.current.x - meshRef.current.rotation.x) * 0.03;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 4]} />
        <MeshDistortMaterial
          color="#00D4FF"
          wireframe
          distort={0.3}
          speed={1.5}
          opacity={0.35}
          transparent
        />
      </mesh>
      {/* Inner glowing core */}
      <Sphere args={[1.0, 32, 32]}>
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.04} />
      </Sphere>
    </Float>
  );
}

// ── Orbiting satellite nodes ─────────────────────────────────────────────────
function OrbitNode({ radius, speed, offset, color }: {
  radius: number; speed: number; offset: number; color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t * 0.7) * radius * 0.5;
    ref.current.position.z = Math.sin(t) * radius * 0.6;
  });

  return (
    <Trail width={0.8} length={4} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// ── Ring of connection lines ─────────────────────────────────────────────────
function NeuralRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.z = t * 0.2; ring1.current.rotation.x = t * 0.1; }
    if (ring2.current) { ring2.current.rotation.y = -t * 0.15; ring2.current.rotation.z = t * 0.08; }
    if (ring3.current) { ring3.current.rotation.x = t * 0.18; ring3.current.rotation.y = t * 0.12; }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.6, 0.008, 6, 80]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.1, 0.006, 6, 80]} />
        <meshBasicMaterial color="#0099CC" transparent opacity={0.18} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.0, 0.005, 6, 60]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

// ── Floating data points ─────────────────────────────────────────────────────
function DataCloud() {
  const { clock } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const r = 2.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00D4FF"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Scene root ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#00D4FF" intensity={2} />
      <pointLight position={[-5, -3, -5]} color="#0044AA" intensity={1} />

      <BrainCore />
      <NeuralRings />
      <DataCloud />

      {/* Orbiting satellite nodes */}
      <OrbitNode radius={2.8} speed={0.6} offset={0}        color="#00D4FF" />
      <OrbitNode radius={3.2} speed={0.4} offset={2.1}      color="#FFD700" />
      <OrbitNode radius={2.5} speed={0.8} offset={4.2}      color="#00D4FF" />
      <OrbitNode radius={3.6} speed={0.35} offset={1.05}    color="#4488FF" />
      <OrbitNode radius={2.2} speed={0.9} offset={3.14}     color="#FFD700" />
    </>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export function Hero3DScene() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        position: 'relative',
      }}
    >
      {/* Radial glow behind the canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        style={{ position: 'relative', zIndex: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
