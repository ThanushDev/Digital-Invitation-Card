import React from 'react';
import { motion } from 'framer-motion';
const PARTICLES = [
{
  cx: '18%',
  cy: '22%',
  dur: 5
},
{
  cx: '72%',
  cy: '34%',
  dur: 6
},
{
  cx: '28%',
  cy: '68%',
  dur: 5.5
},
{
  cx: '82%',
  cy: '78%',
  dur: 6.5
}];

export function CircuitBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      xmlns="http://www.w3.org/2000/svg">
      
      <defs>
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b5fc9" stopOpacity="0" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#3b5fc9" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Left side circuit traces */}
      <g className="left-circuits">
        {/* Vertical lines */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2="100%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        

        {/* Horizontal connectors */}
        <line
          x1="30"
          y1="15%"
          x2="80"
          y2="15%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="30"
          y1="35%"
          x2="70"
          y2="35%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="30"
          y1="55%"
          x2="90"
          y2="55%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="30"
          y1="75%"
          x2="75"
          y2="75%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        

        {/* Circuit nodes */}
        <motion.circle
          cx="30"
          cy="15%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
        
        <motion.circle
          cx="50"
          cy="35%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }} />
        
        <motion.circle
          cx="30"
          cy="55%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }} />
        

        {/* Animated pulses on left */}
        <motion.circle
          r="4"
          fill="url(#pulseGradient)"
          animate={{
            offsetDistance: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            offsetPath: 'path("M 30 0 L 30 100")'
          }} />
        
        <motion.circle
          r="4"
          fill="url(#pulseGradient)"
          animate={{
            offsetDistance: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.5
          }}
          style={{
            offsetPath: 'path("M 50 0 L 50 100")'
          }} />
        
      </g>

      {/* Right side circuit traces */}
      <g className="right-circuits">
        {/* Vertical lines */}
        <line
          x1="calc(100% - 30px)"
          y1="0"
          x2="calc(100% - 30px)"
          y2="100%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="calc(100% - 50px)"
          y1="0"
          x2="calc(100% - 50px)"
          y2="100%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        

        {/* Horizontal connectors */}
        <line
          x1="calc(100% - 80px)"
          y1="20%"
          x2="calc(100% - 30px)"
          y2="20%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="calc(100% - 70px)"
          y1="40%"
          x2="calc(100% - 30px)"
          y2="40%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="calc(100% - 90px)"
          y1="60%"
          x2="calc(100% - 30px)"
          y2="60%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        
        <line
          x1="calc(100% - 75px)"
          y1="80%"
          x2="calc(100% - 30px)"
          y2="80%"
          stroke="#3b5fc9"
          strokeWidth="1" />
        

        {/* Circuit nodes */}
        <motion.circle
          cx="calc(100% - 30px)"
          cy="20%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3
          }} />
        
        <motion.circle
          cx="calc(100% - 50px)"
          cy="40%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8
          }} />
        
        <motion.circle
          cx="calc(100% - 30px)"
          cy="60%"
          r="3"
          fill="#5b7fd9"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2
          }} />
        
      </g>

      {/* Floating particles */}
      {PARTICLES.map((p, i) =>
      <motion.circle
        key={i}
        cx={p.cx}
        cy={p.cy}
        r="2"
        fill="#00d4ff"
        opacity="0.4"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: p.dur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.4
        }} />

      )}
    </svg>);

}