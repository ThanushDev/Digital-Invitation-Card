import React from 'react';
import { motion } from 'framer-motion';

export function CharacterRight() {
  return (
    <motion.div
      className="relative w-32 md:w-40"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
      <svg viewBox="0 0 120 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <radialGradient id="headGradR" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#8b3fd9" />
            <stop offset="100%" stopColor="#2d0a6e" />
          </radialGradient>
          <radialGradient id="eyeGlowR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff80ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#aa00cc" stopOpacity="0.2" />
          </radialGradient>
          <filter id="robotGlowR">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Dual antennae */}
        <line x1="52" y1="10" x2="52" y2="18" stroke="#b060ff" strokeWidth="2" strokeLinecap="round"/>
        <line x1="68" y1="10" x2="68" y2="18" stroke="#b060ff" strokeWidth="2" strokeLinecap="round"/>
        <motion.circle cx="52" cy="8" r="3.5" fill="#b060ff" filter="url(#robotGlowR)"
          animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="68" cy="8" r="3.5" fill="#ff80ff" filter="url(#robotGlowR)"
          animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Head - hexagonal panel style */}
        <rect x="36" y="18" width="48" height="38" rx="10" fill="url(#headGradR)" stroke="#b060ff" strokeWidth="1.5"/>
        {/* Head ridges */}
        <rect x="42" y="19" width="36" height="6" rx="2" fill="#1a0640" stroke="#b060ff" strokeWidth="0.8" opacity="0.9"/>
        {/* Status LEDs */}
        {[0,1,2,3].map(i => (
          <motion.circle key={i} cx={44 + i*9} cy={22} r="2"
            fill={i % 2 === 0 ? "#b060ff" : "#ff80ff"} opacity="0.8"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }} />
        ))}

        {/* Visor - single wide eye strip */}
        <rect x="41" y="30" width="38" height="14" rx="5" fill="#0d0020" stroke="#b060ff" strokeWidth="1.2"/>
        {/* Scanning eye */}
        <motion.rect x="43" y="32" width="34" height="10" rx="4"
          fill="url(#eyeGlowR)" opacity="0.4"
          animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.rect x="43" y="35" width="10" height="4" rx="2"
          fill="#ff80ff"
          animate={{ x: [43, 67, 43] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Mouth bar */}
        <rect x="44" y="49" width="32" height="5" rx="2" fill="#0d0020" stroke="#b060ff" strokeWidth="0.8"/>
        {[0,1,2,3,4].map(i => (
          <motion.rect key={i} x={46 + i*6} y="50" width="3.5" height="3" rx="0.5"
            fill="#b060ff"
            animate={{ opacity: [0.3, 1, 0.3], height: [3, 3, 3] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
        ))}

        {/* Neck with pipes */}
        <rect x="50" y="56" width="20" height="10" rx="3" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>
        <line x1="55" y1="56" x2="55" y2="66" stroke="#b060ff" strokeWidth="0.8" opacity="0.6"/>
        <line x1="65" y1="56" x2="65" y2="66" stroke="#b060ff" strokeWidth="0.8" opacity="0.6"/>

        {/* Torso - bulkier, different shape */}
        <rect x="30" y="66" width="60" height="50" rx="10" fill="url(#headGradR)" stroke="#b060ff" strokeWidth="1.5"/>
        {/* Chest armour plate */}
        <path d="M38 72 L82 72 L86 90 L34 90 Z" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>
        {/* Chest core - triangle energy */}
        <motion.polygon points="60,76 68,88 52,88" fill="none" stroke="#b060ff" strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.polygon points="60,78 66,87 54,87"
          fill="#b060ff"
          animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          filter="url(#robotGlowR)" />
        {/* Side panels */}
        {[0,1].map(i => (<rect key={i} x={34} y={94 + i*7} width="8" height="5" rx="1" fill="#b060ff" opacity="0.4"/>))}
        {[0,1].map(i => (<rect key={i} x={78} y={94 + i*7} width="8" height="5" rx="1" fill="#b060ff" opacity="0.4"/>))}
        {/* Shoulder bolts */}
        <circle cx="34" cy="70" r="4" fill="#1a0640" stroke="#b060ff" strokeWidth="1.2"/>
        <circle cx="86" cy="70" r="4" fill="#1a0640" stroke="#b060ff" strokeWidth="1.2"/>

        {/* Right arm - static, tablet-holding pose */}
        <rect x="88" y="68" width="18" height="36" rx="6" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
        {/* Elbow joint */}
        <circle cx="97" cy="100" r="5" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>
        <rect x="90" y="100" width="14" height="22" rx="5" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
        {/* Tablet / device held */}
        <rect x="88" y="118" width="20" height="14" rx="3" fill="#0d0020" stroke="#b060ff" strokeWidth="1"/>
        <motion.rect x="90" y="120" width="16" height="10" rx="2"
          fill="#b060ff" opacity="0.3"
          animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 1.8, repeat: Infinity }} />

        {/* Left arm - animated wave */}
        <motion.g style={{ transformOrigin: '33px 72px' }}
          animate={{ rotate: [0, 18, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
          <rect x="14" y="68" width="18" height="36" rx="6" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
          <circle cx="23" cy="100" r="5" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>
          <motion.g style={{ transformOrigin: '23px 104px' }}
            animate={{ rotate: [0, -22, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
            <rect x="14" y="100" width="18" height="22" rx="5" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
            <rect x="12" y="120" width="22" height="12" rx="5" fill="#1a0640" stroke="#b060ff" strokeWidth="1.2"/>
            {[0,1,2,3].map(i => (<rect key={i} x={14 + i*5} y="122" width="3.5" height="8" rx="2" fill="#b060ff" opacity="0.5"/>))}
          </motion.g>
        </motion.g>

        {/* Waist belt */}
        <rect x="38" y="114" width="44" height="8" rx="3" fill="#0d0020" stroke="#b060ff" strokeWidth="1"/>
        {[0,1,2,3].map(i => (<rect key={i} x={40 + i*11} y="116" width="8" height="4" rx="1" fill="#b060ff" opacity="0.35"/>))}

        {/* Legs - wider, armoured */}
        <rect x="38" y="122" width="19" height="44" rx="7" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
        <rect x="63" y="122" width="19" height="44" rx="7" fill="#2d0a6e" stroke="#b060ff" strokeWidth="1.2"/>
        {/* Knee armour */}
        <rect x="36" y="140" width="23" height="10" rx="4" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>
        <rect x="61" y="140" width="23" height="10" rx="4" fill="#1a0640" stroke="#b060ff" strokeWidth="1"/>

        {/* Feet - wider hover boots */}
        <rect x="32" y="164" width="28" height="12" rx="6" fill="#1a0640" stroke="#b060ff" strokeWidth="1.2"/>
        <rect x="60" y="164" width="28" height="12" rx="6" fill="#1a0640" stroke="#b060ff" strokeWidth="1.2"/>
        {/* Hover glow */}
        <motion.ellipse cx="46" cy="178" rx="14" ry="4"
          fill="#b060ff" opacity="0.25"
          animate={{ opacity: [0.15, 0.5, 0.15], ry: [3, 5, 3] }}
          transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.ellipse cx="74" cy="178" rx="14" ry="4"
          fill="#b060ff" opacity="0.25"
          animate={{ opacity: [0.15, 0.5, 0.15], ry: [3, 5, 3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
      </svg>
    </motion.div>
  );
}
