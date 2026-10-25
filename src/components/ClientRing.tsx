"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { allClients, logoSrc } from "@/lib/clients";

const N = allClients.length;
const RADIUS = 4.6;
const TAU = Math.PI * 2;

function Tile({ i, src }: { i: number; src: string }) {
  const tex = useTexture(src);
  const a = (i / N) * TAU;
  const bob = i * 1.7;
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8 + bob) * 0.08;
  });
  return (
    <group position={[Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS]} rotation={[0, a, 0]}>
      <group ref={ref}>
        <RoundedBox args={[1.7, 1.25, 0.08]} radius={0.09} smoothness={4}>
          <meshStandardMaterial color="#f4f1ec" roughness={0.35} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.32, 0.9]} />
          <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} map-anisotropy={8} transparent toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.32, 0.9]} />
          <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} map-anisotropy={8} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Ring({ calm, onFront }: { calm: boolean; onFront: (i: number) => void }) {
  const group = useRef<THREE.Group>(null);
  const vel = useRef(calm ? 0 : 0.0035);
  const drag = useRef(false);
  const last = useRef(0);
  const front = useRef(-1);
  const { gl } = useThree();
  const textures = allClients.map((c) => logoSrc(c, 256));

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current = true;
      last.current = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag.current || !group.current) return;
      const dx = e.clientX - last.current;
      last.current = e.clientX;
      group.current.rotation.y += dx * 0.006;
      vel.current = dx * 0.0008;
    };
    const up = () => {
      drag.current = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    if (!drag.current) {
      const rest = calm ? 0 : 0.0035;
      vel.current += (rest - vel.current) * 0.04;
      g.rotation.y += vel.current;
    }
    const idx = (((Math.round((-g.rotation.y / TAU) * N) % N) + N) % N) | 0;
    if (idx !== front.current) {
      front.current = idx;
      onFront(idx);
    }
  });

  return (
    <group ref={group} rotation={[0.1, 0, 0]}>
      {textures.map((src, i) => (
        <Tile key={src} i={i} src={src} />
      ))}
    </group>
  );
}

/** 3D carousel of client logos: a slowly turning ring you can drag. */
export default function ClientRing({ calm, onFront }: { calm: boolean; onFront: (i: number) => void }) {
  return (
    <Canvas camera={{ position: [0, 1.4, 10.8], fov: 38 }} dpr={[1, 2]} className="!cursor-grab active:!cursor-grabbing" style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <pointLight position={[-6, 2, -2]} intensity={14} color="#1dbcbf" />
      <pointLight position={[6, -1, -3]} intensity={12} color="#f17f2a" />
      <Suspense fallback={null}>
        <Ring calm={calm} onFront={onFront} />
      </Suspense>
    </Canvas>
  );
}
