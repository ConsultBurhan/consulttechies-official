"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#f17f2a", "#ef4056", "#1dbcbf", "#0082bd", "#25d366"];
const NODES = 14; // one per service

function fib(i: number, n: number, r: number) {
  const y = 1 - (i / (n - 1)) * 2;
  const rad = Math.sqrt(1 - y * y);
  const t = Math.PI * (3 - Math.sqrt(5)) * i;
  return new THREE.Vector3(Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r);
}

function Network({ calm }: { calm: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { points, lines } = useMemo(() => {
    const pts = Array.from({ length: NODES }, (_, i) => fib(i, NODES, 2.1));
    const seg: number[] = [];
    pts.forEach((a, i) =>
      pts
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((o) => o.j > i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2)
        .forEach((o) => seg.push(a.x, a.y, a.z, pts[o.j].x, pts[o.j].y, pts[o.j].z)),
    );
    // every node also connects to the core
    pts.forEach((p) => seg.push(0, 0, 0, p.x, p.y, p.z));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { points: pts, lines: geo };
  }, []);

  useFrame((state, dt) => {
    const size = state.size;
    const g = group.current;
    if (!g) return;
    const { x, y } = state.pointer;
    g.rotation.y += dt * (calm ? 0.05 : 0.14);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, calm ? 0 : -y * 0.35, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, (size.width > 768 ? 0.9 : 0) + (calm ? 0 : x * 0.4), 0.04);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
    g.children[0]?.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.62, 2]} />
        <meshBasicMaterial color="#1dbcbf" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#f17f2a" />
      </mesh>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#8fd9dc" transparent opacity={0.22} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.1 + (i % 3) * 0.03, 16, 16]} />
          <meshBasicMaterial color={COLORS[i % COLORS.length]} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ calm }: { calm: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <Network calm={calm} />
    </Canvas>
  );
}
