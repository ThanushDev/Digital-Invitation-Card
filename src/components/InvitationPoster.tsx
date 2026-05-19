import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CircuitBackground } from './CircuitBackground';
import { AnimatedGlobe } from './AnimatedGlobe';
import { CharacterLeft } from './CharacterLeft';
import { CharacterRight } from './CharacterRight';
import { TechHUD } from './TechHUD';
import { Calendar, Clock, MapPin } from 'lucide-react';

const T = {
  url: 0.1, label: 0.35, title1: 0.6, title2: 0.85,
  divider: 1.1, guest: 1.25, subtitle: 1.5,
  globe: 1.75, characters: 2.0, details: 2.25,
  organizer: 2.7, footer: 2.95, hud: 3.15
};
const ease = [0.22, 1, 0.36, 1] as const;

// Gear SVG component
function Gear({ size, clockwise, speed, id }: { size: number; clockwise: boolean; speed: number; id: string }) {
  const teeth = 8;
  const outerR = size / 2;
  const innerR = outerR * 0.72;
  const holeR = outerR * 0.22;
  let d = '';
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i * Math.PI) / teeth;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r + outerR;
    const y = Math.sin(angle) * r + outerR;
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  d += ' Z';

  return (
    <motion.svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ filter: `drop-shadow(0 0 6px rgba(0,212,255,0.9))` }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d={d} fill="#00d4ff" stroke="#00ffff" strokeWidth="0.8" filter={`url(#${id})`} />
      <circle cx={outerR} cy={outerR} r={outerR * 0.42} fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
      <circle cx={outerR} cy={outerR} r={holeR} fill="#001833" stroke="#00ffff" strokeWidth="1"/>
    </motion.svg>
  );
}

// Glitch text component
function GlitchTitle({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <motion.span
        style={{ position: 'relative', display: 'inline-block' }}
        animate={{ textShadow: ['0 0 20px rgba(0,212,255,0.3)', '0 0 35px rgba(0,212,255,0.7)', '0 0 20px rgba(0,212,255,0.3)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        {text}
      </motion.span>
      {/* Cyan shard - top */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          color: '#00ffff',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          pointerEvents: 'none',
        }}
        animate={{
          x: [0, -3, 3, 0, 0, -2, 0],
          y: [0, -2, 0, 0, 0, -1, 0],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0.7, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0,0.88,0.89,0.90,0.91,0.93,0.94,0.95,0.96,0.97,0.98,1] }}>
        {text}
      </motion.span>
      {/* Red shard - bottom */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          color: '#ff2d6b',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          pointerEvents: 'none',
        }}
        animate={{
          x: [0, 3, -2, 0, 0, 4, 0],
          y: [0, 2, 0, 0, 0, 1, 0],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0.8, 0, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0,0.87,0.88,0.89,0.90,0.91,0.92,0.93,0.94,0.95,0.96,1] }}>
        {text}
      </motion.span>
    </span>
  );
}

// Floating particles
function FloatingParticles() {
  const particles = [
    { left: '18%', top: '22%', dur: 5 }, { left: '72%', top: '34%', dur: 6 },
    { left: '28%', top: '68%', dur: 5.5 }, { left: '82%', top: '78%', dur: 6.5 },
    { left: '45%', top: '12%', dur: 7 }, { left: '60%', top: '55%', dur: 5.2 },
    { left: '15%', top: '45%', dur: 6.8 }, { left: '88%', top: '20%', dur: 5.8 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {particles.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: 3, height: 3, background: '#00d4ff' }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }} />
      ))}
    </div>
  );
}

// Holographic shimmer overlay
function HoloShimmer() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ zIndex: 50,
        background: 'linear-gradient(105deg, transparent 20%, rgba(0,212,255,0.04) 30%, rgba(255,100,200,0.04) 40%, rgba(120,80,255,0.05) 50%, rgba(0,212,255,0.04) 60%, transparent 70%)',
        backgroundSize: '200% 200%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
  );
}

export function InvitationPoster() {
  const guestName = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('guest');
    return name ? decodeURIComponent(name) : 'Honored Guest';
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 14, rotateY: x * 14, translateY: -4 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, translateY: 0 });
  }, []);

  return (
    <div style={{ perspective: '1200px', width: '100%' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          translateY: tilt.translateY,
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
        className="relative w-full h-full md:w-full md:max-w-md md:mx-auto md:aspect-[3/4] md:rounded-2xl md:shadow-2xl bg-gradient-to-br from-[#0a1845] via-[#0d1b4c] to-[#0a1845] overflow-hidden md:max-h-[95vh]">

        {/* Background layers */}
        <CircuitBackground />
        <TechHUD />
        <FloatingParticles />
        <HoloShimmer />

        {/* Scanning beam */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none z-20"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: T.hud }}
          style={{ boxShadow: '0 0 12px rgba(0, 212, 255, 0.6)' }} />

        {/* Shooting stars */}
        {[0, 1].map(i => (
          <motion.div key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
            style={{ top: `${20 + i * 30}%`, left: '-10%', boxShadow: '0 0 8px #00d4ff' }}
            animate={{ x: ['0vw', '120vw'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: T.hud + i * 3, repeatDelay: 4, ease: 'easeOut' }} />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-5 sm:p-6 md:p-7">

          {/* URL */}
          <motion.p
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.5, delay: T.url, ease }}
            className="text-white/60 text-[10px] tracking-[0.3em] text-center">
            WWW.INNOVATIONEXPO.COM
          </motion.p>

          {/* Invited Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.label, ease }}
            className="text-center mt-3">
            <span className="text-cyan-300/80 text-[10px] tracking-[0.4em] font-semibold">── YOU ARE CORDIALLY INVITED TO ──</span>
          </motion.div>

          {/* Title with spinning gears */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: T.title1 }}
            className="mt-3 flex items-center justify-center gap-2">

            {/* Left gear group */}
            <div className="flex flex-col items-center gap-1">
              <Gear size={28} clockwise={true} speed={4} id="gearL1" />
              <Gear size={16} clockwise={false} speed={3} id="gearL2" />
            </div>

            {/* Title text */}
            <h1 className="font-display font-black text-white text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-tight text-center overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -200, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: T.title1, ease }}>
                <GlitchTitle text="INNOVATION &" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: T.title2, ease }}>
                <GlitchTitle text="TECHNOLOGY" />
              </motion.div>
            </h1>

            {/* Right gear group */}
            <div className="flex flex-col items-center gap-1">
              <Gear size={28} clockwise={false} speed={4} id="gearR1" />
              <Gear size={16} clockwise={true} speed={3} id="gearR2" />
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: T.divider, ease }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-8 mt-3 origin-center" />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5, delay: T.subtitle, ease }}
            className="text-white/80 italic text-xs sm:text-sm text-center mt-2">
            The Skill Exhibition · 2026
          </motion.p>

          {/* Guest name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: T.guest, ease }}
            className="text-center mt-3">
            <p className="text-white/60 text-[10px] tracking-widest">DEAR</p>
            
            {/* ⭐ මෙන්න මෙතනට මම "whitespace-pre-line" සහ "leading-relaxed" පන්ති (Classes) එකතු කලා */}
            {/* මේකෙන් තමයි Invitation එක ඇතුලේ නම ඔයා කඩපු විදිහටම පේළි කැඩිලා ලස්සනට පෙන්වන්නේ! */}
            <motion.p
              className="font-display text-white text-base sm:text-lg font-semibold tracking-wide mt-1.5 whitespace-pre-line leading-relaxed text-center break-words"
              animate={{ textShadow: ['0 0 8px rgba(0,212,255,0.3)', '0 0 16px rgba(0,212,255,0.6)', '0 0 8px rgba(0,212,255,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              {guestName}
            </motion.p>
          </motion.div>

          {/* Middle — characters + globe */}
          <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 px-1 relative flex-1 min-h-0 mt-2">
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ opacity: { duration: 0.5, delay: T.globe }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: T.globe } }} />

            <motion.div
              initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: T.characters, ease }}
              className="flex-shrink-0 relative z-10 self-end">
              <CharacterLeft />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: T.globe, type: 'spring', stiffness: 100, damping: 14 }}
              className="flex-shrink-0 relative z-20 self-center">
              <AnimatedGlobe />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: T.characters, ease }}
              className="flex-shrink-0 relative z-10 self-end">
              <CharacterRight />
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: T.details, ease }}
            className="grid grid-cols-3 gap-2 mt-3 px-2">
            {[
              { Icon: Calendar, label: 'DATE', value: '25 MAY 2026' },
              { Icon: Clock, label: 'TIME', value: '10:30 AM' },
              { Icon: MapPin, label: 'VENUE', value: 'MAIN CANTEEN (CAFETERIA)' },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: T.details + i * 0.12, ease }}
                className="flex flex-col items-center text-center bg-[#3b5fc9]/15 backdrop-blur-sm rounded-lg border border-cyan-400/20 py-2 px-1">
                <item.Icon className="w-3.5 h-3.5 text-cyan-300 mb-1" />
                <p className="text-cyan-300/70 text-[8px] tracking-[0.2em] font-semibold">{item.label}</p>
                <p className="text-white text-[10px] sm:text-xs font-medium mt-0.5 leading-tight">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Organizer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: T.organizer, ease }}
            className="text-center mt-3">
            <p className="text-cyan-300/70 text-[9px] tracking-[0.3em] font-semibold">ORGANIZED BY</p>
            <p className="text-white/90 text-xs sm:text-sm font-semibold mt-0.5 tracking-wide">22/23 DBMS BATCH</p>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: T.footer, ease }}
            className="text-center mt-2 pt-2 border-t border-cyan-400/15">
            <p className="text-white/50 text-[9px] tracking-wider">DESIGN BY: MR.THANUSH</p>
          </motion.div>
        </div>

        {/* Corner brackets */}
        {[
          { top: 6, left: 6, rotate: 0 }, { top: 6, right: 6, rotate: 90 },
          { bottom: 6, right: 6, rotate: 180 }, { bottom: 6, left: 6, rotate: 270 },
        ].map((pos, i) => (
          <motion.div key={`corner-${i}`} className="absolute w-5 h-5 pointer-events-none" style={pos}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: T.hud + i * 0.08 }}>
            <motion.div className="w-full h-full" style={{ rotate: pos.rotate }}
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-cyan-400" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
