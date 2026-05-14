import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
const NUM_POINTS = 160;
const NUM_CITIES = 10;
const RADIUS = 80;
const LINE_DIST = 18;
type Point3D = {
  x: number;
  y: number;
  z: number;
  pulse?: number;
};
function generateSpherePoints(n: number): Point3D[] {
  const pts: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - i / (n - 1) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius
    });
  }
  return pts;
}
function generateCities(n: number): Point3D[] {
  const cities: Point3D[] = [];
  for (let i = 0; i < n; i++) {
    const u = i * 0.618 % 1;
    const v = i * 0.382 % 1;
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    cities.push({
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta),
      pulse: i * 0.6
    });
  }
  return cities;
}
export function AnimatedGlobe() {
  const [angle, setAngle] = useState(0);
  const points = useMemo(() => generateSpherePoints(NUM_POINTS), []);
  const cities = useMemo(() => generateCities(NUM_CITIES), []);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    let lastUpdate = 0;
    const tick = (now: number) => {
      // Throttle to ~30fps for perf
      if (now - lastUpdate > 33) {
        const elapsed = (now - start) / 1000;
        setAngle(elapsed / 16 * Math.PI * 2);
        lastUpdate = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  const tiltX = 0.35;
  const cosT = Math.cos(tiltX);
  const sinT = Math.sin(tiltX);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const projected = points.map((p) => {
    const x1 = p.x * cosA + p.z * sinA;
    const z1 = -p.x * sinA + p.z * cosA;
    const y2 = p.y * cosT - z1 * sinT;
    const z2 = p.y * sinT + z1 * cosT;
    return {
      x: x1 * RADIUS,
      y: y2 * RADIUS,
      z: z2
    };
  });
  const projectedCities = cities.map((p) => {
    const x1 = p.x * cosA + p.z * sinA;
    const z1 = -p.x * sinA + p.z * cosA;
    const y2 = p.y * cosT - z1 * sinT;
    const z2 = p.y * sinT + z1 * cosT;
    return {
      x: x1 * RADIUS,
      y: y2 * RADIUS,
      z: z2,
      pulse: p.pulse
    };
  });
  // Connection mesh — only front-facing dots, capped count
  const lines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    o: number;
  }[] = [];
  const visible: typeof projected = [];
  for (let i = 0; i < projected.length; i++) {
    if (projected[i].z > 0) visible.push(projected[i]);
  }
  for (let i = 0; i < visible.length && lines.length < 120; i++) {
    for (let j = i + 1; j < visible.length && lines.length < 120; j++) {
      const dx = visible[i].x - visible[j].x;
      const dy = visible[i].y - visible[j].y;
      const d2 = dx * dx + dy * dy;
      if (d2 < LINE_DIST * LINE_DIST) {
        const d = Math.sqrt(d2);
        lines.push({
          x1: visible[i].x,
          y1: visible[i].y,
          x2: visible[j].x,
          y2: visible[j].y,
          o: (1 - d / LINE_DIST) * 0.35
        });
      }
    }
  }
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.65, 0.4]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
      

      <svg
        viewBox="-100 -100 200 200"
        className="relative w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(0, 200, 255, 0.6))'
        }}>
        
        <defs>
          <radialGradient id="sphereBg" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0a2e5e" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#021439" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000a1f" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7df9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r={RADIUS} fill="url(#sphereBg)" />

        <g>
          {lines.map((l, i) =>
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#00d4ff"
            strokeWidth="0.4"
            opacity={l.o} />

          )}
        </g>

        <g>
          {projected.map((p, i) => {
            const front = p.z > 0;
            const depth = (p.z + 1) / 2;
            const opacity = front ? 0.4 + depth * 0.6 : 0.15;
            const size = front ? 0.8 + depth * 1.0 : 0.5;
            return (
              <circle
                key={`p-${i}`}
                cx={p.x}
                cy={p.y}
                r={size}
                fill={front ? '#9fefff' : '#1e5a99'}
                opacity={opacity} />);


          })}
        </g>

        <g>
          {projectedCities.map((c, i) => {
            if (c.z < -0.1) return null;
            const depth = (c.z + 1) / 2;
            const pulseT = (angle * 2 + (c.pulse ?? 0)) % (Math.PI * 2);
            const pulseScale = 1 + Math.sin(pulseT) * 0.4;
            return (
              <g key={`c-${i}`} opacity={0.6 + depth * 0.4}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={5 * pulseScale}
                  fill="url(#cityGlow)"
                  opacity={0.5} />
                
                <circle cx={c.x} cy={c.y} r={1.6} fill="#ffffff" />
              </g>);

          })}
        </g>

        <circle
          cx="0"
          cy="0"
          r={RADIUS}
          fill="none"
          stroke="#00d4ff"
          strokeWidth="0.6"
          opacity="0.5" />
        
      </svg>

      {/* Single orbiting satellite (perf-friendly) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 0,
          height: 0
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
        <div
          className="absolute rounded-full bg-cyan-200"
          style={{
            width: '4px',
            height: '4px',
            transform: 'translate(80px, -2px)',
            boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.6)'
          }} />
        
      </motion.div>

      {/* Data ping ring */}
      <motion.div
        className="absolute rounded-full border border-cyan-400 pointer-events-none"
        style={{
          width: '70%',
          height: '70%'
        }}
        animate={{
          scale: [0.9, 1.6],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut'
        }} />
      
    </div>);

}