import React from 'react';
import { motion } from 'framer-motion';
export function CharacterLeft() {
  return (
    <motion.div
      className="relative w-32 md:w-40"
      animate={{
        y: [0, -8, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      
      <svg
        viewBox="0 0 120 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto">
        
        {/* Head */}
        <circle cx="60" cy="35" r="18" fill="#ffd4a3" />

        {/* Hair */}
        <path
          d="M42 30 Q45 18 60 18 Q75 18 78 30 L75 35 Q72 25 60 25 Q48 25 45 35 Z"
          fill="#f4c542" />
        

        {/* VR Visor */}
        <rect
          x="45"
          y="32"
          width="30"
          height="8"
          rx="4"
          fill="#3b5fc9"
          opacity="0.8" />
        
        <circle cx="52" cy="36" r="2" fill="#00d4ff" opacity="0.6" />
        <circle cx="68" cy="36" r="2" fill="#00d4ff" opacity="0.6" />

        {/* Neck */}
        <rect x="54" y="50" width="12" height="8" fill="#ffc89a" />

        {/* White top */}
        <path d="M48 58 L72 58 L75 75 L45 75 Z" fill="#ffffff" />

        {/* Blue overalls */}
        <path
          d="M45 75 L75 75 L78 130 L72 145 L48 145 L42 130 Z"
          fill="#5b7fd9" />
        

        {/* Overalls straps */}
        <rect x="50" y="58" width="4" height="20" fill="#5b7fd9" />
        <rect x="66" y="58" width="4" height="20" fill="#5b7fd9" />

        {/* Overalls pocket */}
        <rect x="52" y="90" width="16" height="12" rx="2" fill="#4a6bc9" />

        {/* Left arm (static) */}
        <motion.g>
          <path
            d="M45 70 L35 85 L32 105 L28 115"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none" />
          
          <circle cx="28" cy="115" r="5" fill="#ffd4a3" />
        </motion.g>

        {/* Right arm (animated - gesturing) */}
        <motion.g
          style={{
            transformOrigin: '75px 70px'
          }}
          animate={{
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}>
          
          <path
            d="M75 70 L85 80 L92 95"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none" />
          
          <motion.g
            animate={{
              rotate: [0, 20, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
            style={{
              transformOrigin: '92px 95px'
            }}>
            
            <path
              d="M92 95 L98 108"
              stroke="#ffd4a3"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none" />
            
            <circle cx="98" cy="108" r="5" fill="#ffd4a3" />
          </motion.g>
        </motion.g>

        {/* Legs */}
        <path
          d="M48 145 L46 165 L42 175"
          stroke="#5b7fd9"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none" />
        
        <path
          d="M72 145 L74 165 L78 175"
          stroke="#5b7fd9"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none" />
        

        {/* Shoes */}
        <ellipse cx="40" cy="176" rx="8" ry="4" fill="#f4c542" />
        <ellipse cx="80" cy="176" rx="8" ry="4" fill="#f4c542" />
      </svg>
    </motion.div>);

}