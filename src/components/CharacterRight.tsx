import React from 'react';
import { motion } from 'framer-motion';
export function CharacterRight() {
  return (
    <motion.div
      className="relative w-32 md:w-40"
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.8
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
          d="M42 28 Q45 16 60 16 Q75 16 78 28 L76 33 Q73 23 60 23 Q47 23 44 33 Z"
          fill="#8b5a3c" />
        

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

        {/* White t-shirt */}
        <path d="M45 58 L75 58 L78 95 L42 95 Z" fill="#ffffff" />

        {/* T-shirt sleeves */}
        <ellipse cx="42" cy="68" rx="8" ry="12" fill="#ffffff" />
        <ellipse cx="78" cy="68" rx="8" ry="12" fill="#ffffff" />

        {/* Blue pants */}
        <path
          d="M42 95 L78 95 L76 145 L70 145 L68 120 L52 120 L50 145 L44 145 Z"
          fill="#5b7fd9" />
        

        {/* Belt */}
        <rect x="42" y="93" width="36" height="4" fill="#4a6bc9" />

        {/* Right arm (static) */}
        <motion.g>
          <path
            d="M78 70 L88 85 L92 105 L96 115"
            stroke="#ffd4a3"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none" />
          
          <circle cx="96" cy="115" r="5" fill="#ffd4a3" />
        </motion.g>

        {/* Left arm (animated - gesturing) */}
        <motion.g
          style={{
            transformOrigin: '45px 70px'
          }}
          animate={{
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3
          }}>
          
          <path
            d="M45 70 L35 80 L28 95"
            stroke="#ffd4a3"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none" />
          
          <motion.g
            animate={{
              rotate: [0, -20, 0]
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3
            }}
            style={{
              transformOrigin: '28px 95px'
            }}>
            
            <path
              d="M28 95 L22 108"
              stroke="#ffd4a3"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none" />
            
            <circle cx="22" cy="108" r="5" fill="#ffd4a3" />
          </motion.g>
        </motion.g>

        {/* Legs */}
        <path
          d="M50 145 L48 165 L44 175"
          stroke="#5b7fd9"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none" />
        
        <path
          d="M70 145 L72 165 L76 175"
          stroke="#5b7fd9"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none" />
        

        {/* Shoes */}
        <ellipse cx="42" cy="176" rx="8" ry="4" fill="#f4c542" />
        <ellipse cx="78" cy="176" rx="8" ry="4" fill="#f4c542" />
      </svg>
    </motion.div>);

}