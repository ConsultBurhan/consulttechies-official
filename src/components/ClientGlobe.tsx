"use client";

import { useEffect, useRef } from "react";

const rad = (d: number) => (d * Math.PI) / 180;
const vec = (lat: number, lon: number): [number, number, number] => [Math.cos(rad(lat)) * Math.sin(rad(lon)), Math.sin(rad(lat)), Math.cos(rad(lat)) * Math.cos(rad(lon))];

export type Pin = { name: string; lat: number; lon: number; kind: "office" | "client" };

/**
 * Dotted globe that turns slowly: offices in teal, client countries in orange, with arcs from the
 * head office to each client. Drag to turn. Decorative; the same facts are listed beside it in text.
 */
export function ClientGlobe({ pins, hub }: { pins: Pin[]; hub: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots: [number, number, number][] = [];
    const N = 1500;
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * Math.PI * (3 - Math.sqrt(5));
      dots.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    const P = pins.map((p) => ({ ...p, v: vec(p.lat, p.lon) }));
    const H = P.find((p) => p.name === hub) ?? P[0];
    // face the Gulf and Europe, where the clients are, tilted to the northern hemisphere
    const baseYaw = rad(-38);
    let yaw = baseYaw;
    let pitch = rad(30);
    let sway = 0;
    let drag = false;
    let lx = 0;
    let ly = 0;
    let raf = 0;
    let vis = true;
    let t0 = 0;

    const size = () => {
      const s = cv.clientWidth;
      const d = window.devicePixelRatio || 1;
      cv.width = s * d;
      cv.height = s * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const rot = (v: number[]): [number, number, number] => {
      const [x, y, z] = v;
      const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
      const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
      return [x1, y * Math.cos(pitch) - z1 * Math.sin(pitch), y * Math.sin(pitch) + z1 * Math.cos(pitch)];
    };
    const arc = (a: number[], b: number[], color: string, progress: number) => {
      const om = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
      if (om < 1e-3) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let pen = false;
      const steps = 48;
      for (let i = 0; i <= steps * progress; i++) {
        const t = i / steps;
        const k1 = Math.sin((1 - t) * om) / Math.sin(om);
        const k2 = Math.sin(t * om) / Math.sin(om);
        const lift = 1 + 0.12 * Math.sin(Math.PI * t) * Math.min(1, om);
        const [x, y, z] = rot([0, 1, 2].map((j) => (k1 * a[j] + k2 * b[j]) * lift));
        if (z < 0.02) {
          pen = false;
          continue;
        }
        if (pen) ctx.lineTo(c + x * R, c - y * R);
        else {
          ctx.moveTo(c + x * R, c - y * R);
          pen = true;
        }
      }
      ctx.stroke();
    };
    let R = 0;
    let c = 0;
    const draw = (now: number) => {
      const s = cv.clientWidth;
      R = s * 0.42;
      c = s / 2;
      const cs = getComputedStyle(document.documentElement);
      const fg = cs.getPropertyValue("--fg").trim() || "#fff";
      const orange = cs.getPropertyValue("--orange").trim() || "#f17f2a";
      const teal = cs.getPropertyValue("--teal").trim() || "#1dbcbf";
      ctx.clearRect(0, 0, s, s);

      const g = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      g.addColorStop(0, "rgba(128,140,160,0.16)");
      g.addColorStop(1, "rgba(128,140,160,0.02)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, 7);
      ctx.fill();
      ctx.strokeStyle = fg;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = fg;
      for (const d of dots) {
        const [x, y, z] = rot(d);
        if (z < 0) continue;
        ctx.globalAlpha = 0.08 + z * 0.45;
        ctx.fillRect(c + x * R, c - y * R, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;

      // arcs draw in once, then stay
      const prog = reduce ? 1 : Math.min(1, (now - t0) / 1800);
      for (const p of P) if (p !== H) arc(H.v, p.v, p.kind === "office" ? teal : orange, prog);

      ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
      for (const p of P) {
        const [x, y, z] = rot(p.v);
        if (z < 0.05) continue;
        const px = c + x * R;
        const py = c - y * R;
        const col = p.kind === "office" ? teal : orange;
        const pulse = reduce ? 0 : (Math.sin(now / 600 + p.lon) + 1) / 2;
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.25 * (1 - pulse);
        ctx.beginPath();
        ctx.arc(px, py, 6 + pulse * 8, 0, 7);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, 7);
        ctx.fill();
        ctx.fillStyle = fg;
        ctx.globalAlpha = Math.min(1, z * 2);
        ctx.fillText(p.name, px + 9, py + 4);
        ctx.globalAlpha = 1;
      }
    };
    const loop = (now: number) => {
      if (!t0) t0 = now;
      if (vis) {
        // sway gently around the client region rather than spinning it out of view
        if (!drag && !reduce) {
          const target = baseYaw + sway + Math.sin(now / 5000) * 0.45;
          yaw += (target - yaw) * 0.03;
        }
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    size();
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      if (vis && !t0) t0 = 0;
    });
    io.observe(cv);
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const down = (e: PointerEvent) => {
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      cv.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      yaw += (e.clientX - lx) * 0.008;
      sway = yaw - baseYaw;
      pitch = Math.max(-1.1, Math.min(1.1, pitch - (e.clientY - ly) * 0.006));
      lx = e.clientX;
      ly = e.clientY;
    };
    const up = () => (drag = false);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, [pins, hub]);

  return <canvas ref={ref} aria-hidden="true" className="aspect-square w-full max-w-[520px] cursor-grab touch-pan-y active:cursor-grabbing" />;
}
