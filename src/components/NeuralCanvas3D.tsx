import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

type QualityLevel = 'low' | 'high';

function isLowQualityDevice() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallViewport = window.innerWidth < 900;
  const hardwareThreads = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 8;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return reducedMotion || smallViewport || hardwareThreads <= 4 || deviceMemory <= 4;
}

function ParticleField({ quality }: { quality: QualityLevel }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const [positions, connections, maxConnections] = useMemo(() => {
    const particleCount = quality === 'high' ? 88 : 56;
    const maxLinks = quality === 'high' ? 36 : 20;
    const pos = new Float32Array(particleCount * 3);
    const conns: [number, number][] = [];

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      for (let j = 0; j < i; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 4) conns.push([i, j]);
      }
    }

    return [pos, conns, maxLinks];
  }, [quality]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pos.length / 3; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(time * 0.3 + i * 0.2) * 0.002;
      pos[i3] += Math.cos(time * 0.2 + i * 0.3) * 0.001;
      const dx = mouse.current.x * 5 - pos[i3];
      const dy = mouse.current.y * 5 - pos[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0.001 && dist < 2) {
        pos[i3] -= (dx / dist) * 0.02;
        pos[i3 + 1] -= (dy / dist) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = scroll.current * Math.PI * 0.2;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={quality === 'high' ? 0.08 : 0.07}
          sizeAttenuation
          depthWrite={false}
          opacity={quality === 'high' ? 0.6 : 0.45}
        />
      </Points>
      {connections.slice(0, maxConnections).map(([i, j], idx) => {
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
            <lineBasicMaterial color="#00D4FF" transparent opacity={quality === 'high' ? 0.15 : 0.1} />
          </line>
        );
      })}
    </>
  );
}

function BackgroundOrbs({ quality }: { quality: QualityLevel }) {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);
  const detail = quality === 'high' ? 1 : 0;
  const torusSegments = quality === 'high' ? 80 : 56;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.04;
      mesh1.current.rotation.y = t * 0.07;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y = -t * 0.05;
      mesh2.current.rotation.z = t * 0.03;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x = -t * 0.06;
      mesh3.current.rotation.z = t * 0.08;
    }
  });

  return (
    <>
      <mesh ref={mesh1} position={[-6, 2, -6]}>
        <icosahedronGeometry args={[3.5, detail]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.05} depthWrite={false} />
      </mesh>
      <mesh ref={mesh2} position={[7, -1, -8]}>
        <icosahedronGeometry args={[2.8, detail]} />
        <meshBasicMaterial color="#4488FF" wireframe transparent opacity={0.04} depthWrite={false} />
      </mesh>
      <mesh ref={mesh3} position={[1, -2, -4]}>
        <torusGeometry args={[4, 0.015, 6, torusSegments]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </>
  );
}

function PulseRings({ quality }: { quality: QualityLevel }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const ringSegments = quality === 'high' ? 80 : 48;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const period = 7;

    [
      { ref: ring1, phase: 0 },
      { ref: ring2, phase: 2.4 },
      { ref: ring3, phase: 4.8 },
    ].forEach(({ ref, phase }) => {
      if (!ref.current) return;
      const progress = ((t + phase) % period) / period;
      ref.current.scale.setScalar(Math.max(0.01, progress * 6 + 0.5));
      (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        (quality === 'high' ? 0.13 : 0.09) * (1 - progress),
      );
    });
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.012, 4, ringSegments]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.13} depthWrite={false} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.5, 0.012, 4, ringSegments]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.13} depthWrite={false} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1.5, 0.012, 4, ringSegments]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.13} depthWrite={false} />
      </mesh>
    </>
  );
}

function DepthGrid({ quality }: { quality: QualityLevel }) {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(
      quality === 'high' ? 40 : 30,
      quality === 'high' ? 22 : 14,
      new THREE.Color('#001830'),
      new THREE.Color('#001020'),
    );
    g.position.set(0, -7, -2);
    g.rotation.set(-0.12, 0, 0);
    return g;
  }, [quality]);

  return <primitive object={grid} />;
}

function StarShell({ quality }: { quality: QualityLevel }) {
  const shellRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = quality === 'high' ? 280 : 140;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi) - 6;
    }
    return arr;
  }, [quality]);

  useFrame(({ clock }) => {
    if (!shellRef.current) return;
    const t = clock.getElapsedTime();
    shellRef.current.rotation.y = t * 0.015;
    shellRef.current.rotation.x = Math.sin(t * 0.08) * 0.08;
  });

  return (
    <points ref={shellRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#77DFFF"
        size={quality === 'high' ? 0.06 : 0.05}
        transparent
        opacity={quality === 'high' ? 0.24 : 0.16}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingCrystals({ quality }: { quality: QualityLevel }) {
  const groupRef = useRef<THREE.Group>(null);
  const crystalCount = quality === 'high' ? 8 : 4;
  const seeds = useMemo(
    () =>
      Array.from({ length: crystalCount }, (_, i) => ({
        baseX: (Math.random() - 0.5) * 18,
        baseY: (Math.random() - 0.5) * 10,
        baseZ: -3 - Math.random() * 7,
        speed: 0.08 + Math.random() * 0.08,
        offset: i * 0.7,
      })),
    [crystalCount],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const seed = seeds[i];
      child.position.x = seed.baseX + Math.sin(t * seed.speed + seed.offset) * 0.5;
      child.position.y = seed.baseY + Math.cos(t * seed.speed + seed.offset) * 0.4;
      child.rotation.x = t * 0.1 + i * 0.2;
      child.rotation.y = -t * 0.12 + i * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {seeds.map((seed, idx) => (
        <mesh key={idx} position={[seed.baseX, seed.baseY, seed.baseZ]}>
          <octahedronGeometry args={[quality === 'high' ? 0.24 : 0.2, 0]} />
          <meshBasicMaterial color="#66CCFF" wireframe transparent opacity={0.1} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralCanvas3D() {
  const quality: QualityLevel = isLowQualityDevice() ? 'low' : 'high';
  const dpr: [number, number] = quality === 'high' ? [1, 1.5] : [1, 1.2];

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
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={dpr}
      >
        <ambientLight intensity={0.5} />
        <ParticleField quality={quality} />
        <BackgroundOrbs quality={quality} />
        <PulseRings quality={quality} />
        <DepthGrid quality={quality} />
        {quality === 'high' && <StarShell quality={quality} />}
        {quality === 'high' && <FloatingCrystals quality={quality} />}
      </Canvas>
    </div>
  );
}
