import React from 'react';
import { motion } from 'framer-motion';

export function CharacterLeft() {
  return (
    <motion.div
      className="relative w-32 md:w-40"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <svg viewBox="0 0 120 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <radialGradient id="headGradL" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a7bd5" />
            <stop offset="100%" stopColor="#0d2a6e" />
          </radialGradient>
          <radialGradient id="eyeGlowL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#0088cc" stopOpacity="0.2" />
          </radialGradient>
          <filter id="robotGlowL">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Antenna */}
        <line x1="60" y1="8" x2="60" y2="18" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
        <motion.circle cx="60" cy="6" r="4" fill="#00d4ff" filter="url(#robotGlowL)"
          animate={{ opacity: [1, 0.3, 1], r: [4, 5.5, 4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Head */}
        <rect x="38" y="18" width="44" height="36" rx="8" fill="url(#headGradL)" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="44" y="20" width="32" height="8" rx="3" fill="#0a1f5e" stroke="#00d4ff" strokeWidth="0.8" opacity="0.9"/>
        <circle cx="52" cy="24" r="2" fill="#00d4ff" opacity="0.7"/>
        <circle cx="60" cy="24" r="2" fill="#00d4ff" opacity="0.7"/>
        <circle cx="68" cy="24" r="2" fill="#00d4ff" opacity="0.7"/>

        {/* Eyes */}
        <rect x="43" y="30" width="14" height="9" rx="3" fill="#001833" stroke="#00d4ff" strokeWidth="1"/>
        <rect x="63" y="30" width="14" height="9" rx="3" fill="#001833" stroke="#00d4ff" strokeWidth="1"/>
        <motion.rect x="45" y="32" width="10" height="5" rx="2" fill="url(#eyeGlowL)"
          animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.rect x="65" y="32" width="10" height="5" rx="2" fill="url(#eyeGlowL)"
          animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />

        {/* Mouth grille */}
        <rect x="46" y="44" width="28" height="6" rx="2" fill="#001833" stroke="#00d4ff" strokeWidth="0.8"/>
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x={48 + i*4} y="45.5" width="2.5" height="3" rx="0.5" fill="#00d4ff" opacity="0.6"/>
        ))}

        {/* Neck */}
        <rect x="53" y="54" width="14" height="10" rx="2" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1"/>

        {/* Torso */}
        <rect x="32" y="64" width="56" height="52" rx="8" fill="url(#headGradL)" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="40" y="70" width="40" height="26" rx="5" fill="#001833" stroke="#00d4ff" strokeWidth="1"/>
        <motion.circle cx="60" cy="83" r="9" fill="none" stroke="#00d4ff" strokeWidth="1.5"
          animate={{ r: [9, 11, 9], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="60" cy="83" r="5" fill="#00d4ff" filter="url(#robotGlowL)"
          animate={{ opacity: [0.5, 1, 0.5], r: [5, 6.5, 5] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
        {[0,1,2].map(i => (<rect key={i} x="36" y={72 + i*7} width="6" height="4" rx="1" fill="#00d4ff" opacity="0.4"/>))}
        {[0,1,2].map(i => (<rect key={i} x="78" y={72 + i*7} width="6" height="4" rx="1" fill="#00d4ff" opacity="0.4"/>))}
        <circle cx="36" cy="68" r="4" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>
        <circle cx="84" cy="68" r="4" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>

        {/* Left arm static */}
        <rect x="15" y="66" width="18" height="38" rx="6" fill="#142f7a" stroke="#00d4ff" strokeWidth="1.2"/>
        <rect x="18" y="74" width="12" height="6" rx="2" fill="#00d4ff" opacity="0.3"/>
        <rect x="13" y="102" width="22" height="14" rx="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>
        {[0,1,2,3].map(i => (<rect key={i} x={15 + i*5} y="104" width="3.5" height="10" rx="2" fill="#00d4ff" opacity="0.5"/>))}

        {/* Right arm animated */}
        <motion.g style={{ transformOrigin: '87px 70px' }}
          animate={{ rotate: [0, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
          <rect x="87" y="66" width="18" height="38" rx="6" fill="#142f7a" stroke="#00d4ff" strokeWidth="1.2"/>
          <rect x="90" y="74" width="12" height="6" rx="2" fill="#00d4ff" opacity="0.3"/>
          <motion.g style={{ transformOrigin: '96px 104px' }}
            animate={{ rotate: [0, 25, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <rect x="85" y="102" width="22" height="14" rx="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>
            {[0,1,2,3].map(i => (<rect key={i} x={87 + i*5} y="104" width="3.5" height="10" rx="2" fill="#00d4ff" opacity="0.5"/>))}
          </motion.g>
        </motion.g>

        {/* Waist */}
        <rect x="40" y="114" width="40" height="8" rx="3" fill="#0a1f5e" stroke="#00d4ff" strokeWidth="1"/>

        {/* Legs */}
        <rect x="40" y="122" width="17" height="42" rx="6" fill="#142f7a" stroke="#00d4ff" strokeWidth="1.2"/>
        <rect x="63" y="122" width="17" height="42" rx="6" fill="#142f7a" stroke="#00d4ff" strokeWidth="1.2"/>
        <circle cx="48.5" cy="146" r="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1"/>
        <circle cx="71.5" cy="146" r="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1"/>

        {/* Feet */}
        <rect x="36" y="162" width="25" height="12" rx="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>
        <rect x="59" y="162" width="25" height="12" rx="5" fill="#0d2a6e" stroke="#00d4ff" strokeWidth="1.2"/>
        <motion.rect x="40" y="172" width="5" height="4" rx="2" fill="#00d4ff"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.rect x="63" y="172" width="5" height="4" rx="2" fill="#00d4ff"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
      </svg>
    </motion.div>
  );
}
