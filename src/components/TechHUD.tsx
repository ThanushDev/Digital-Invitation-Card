import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
/**
 * Lightweight tech HUD overlay — binary streams, hex frames, neural nodes.
 * Reduced count for performance.
 */
export function TechHUD() {
  const binaryStrings = useMemo(
    () =>
    Array.from(
      {
        length: 4
      },
      () =>
      Array.from(
        {
          length: 10
        },
        () => Math.random() > 0.5 ? '1' : '0'
      ).join('')
    ),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Binary code rain — left */}
      <div className="absolute top-1/4 left-1 flex gap-1 opacity-25">
        {binaryStrings.slice(0, 2).map((str, i) =>
        <motion.div
          key={`bin-l-${i}`}
          className="text-cyan-400 text-[8px] font-mono leading-tight"
          animate={{
            y: ['0%', '100%']
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.8
          }}
          style={{
            writingMode: 'vertical-rl'
          }}>
          
            {str}
          </motion.div>
        )}
      </div>

      {/* Binary code rain — right */}
      <div className="absolute top-1/4 right-1 flex gap-1 opacity-25">
        {binaryStrings.slice(2, 4).map((str, i) =>
        <motion.div
          key={`bin-r-${i}`}
          className="text-cyan-400 text-[8px] font-mono leading-tight"
          animate={{
            y: ['100%', '0%']
          }}
          transition={{
            duration: 11 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.2
          }}
          style={{
            writingMode: 'vertical-rl'
          }}>
          
            {str}
          </motion.div>
        )}
      </div>

      {/* Hexagonal HUD — top-left */}
      <motion.svg
        className="absolute top-2 left-2 w-8 h-8 opacity-50"
        viewBox="0 0 40 40"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
        <polygon
          points="20,4 34,12 34,28 20,36 6,28 6,12"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="0.8"
          opacity="0.6" />
        
        <circle cx="20" cy="20" r="1.5" fill="#00d4ff" />
      </motion.svg>

      {/* Hexagonal HUD — bottom-right */}
      <motion.svg
        className="absolute bottom-2 right-2 w-8 h-8 opacity-50"
        viewBox="0 0 40 40"
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
        <polygon
          points="20,4 34,12 34,28 20,36 6,28 6,12"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="0.8"
          opacity="0.6" />
        
        <circle cx="20" cy="20" r="1.5" fill="#00d4ff" />
      </motion.svg>

      {/* Status — top right (delayed entrance) */}
      <motion.div
        className="absolute top-3 right-12 text-[8px] font-mono text-cyan-400/70 tracking-widest flex items-center gap-1"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.6,
          delay: 2.6
        }}>
        
        <motion.span
          animate={{
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
          className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
        
        <span>AI.SYS ONLINE</span>
      </motion.div>

      {/* Status — bottom left */}
      <motion.div
        className="absolute bottom-3 left-12 text-[8px] font-mono text-cyan-400/70 tracking-widest"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.6,
          delay: 2.8
        }}>
        
        NEURAL.NET v4.1
        <motion.span
          animate={{
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity
          }}
          className="ml-1">
          
          _
        </motion.span>
      </motion.div>
    </div>);

}