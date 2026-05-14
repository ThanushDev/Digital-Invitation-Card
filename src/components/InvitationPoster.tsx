import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBackground } from './CircuitBackground';
import { AnimatedGlobe } from './AnimatedGlobe';
import { CharacterLeft } from './CharacterLeft';
import { CharacterRight } from './CharacterRight';
import { TechHUD } from './TechHUD';
import { Calendar, Clock, MapPin } from 'lucide-react';
// SEQUENTIAL TIMING — each element comes in cleanly one after another
const T = {
  url: 0.1,
  label: 0.35,
  title1: 0.6,
  title2: 0.85,
  divider: 1.1,
  guest: 1.25,
  subtitle: 1.5,
  globe: 1.75,
  characters: 2.0,
  details: 2.25,
  organizer: 2.7,
  footer: 2.95,
  hud: 3.15
};
const ease = [0.22, 1, 0.36, 1] as const;
export function InvitationPoster() {
  // Read guest name from URL parameter: ?guest=Kamal+Perera
  const guestName = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('guest');
    return name ? decodeURIComponent(name) : 'Honored Guest';
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.5
      }}
      className="relative w-full h-full md:w-full md:max-w-md md:mx-auto md:aspect-[3/4] md:rounded-2xl md:shadow-2xl bg-gradient-to-br from-[#0a1845] via-[#0d1b4c] to-[#0a1845] overflow-hidden md:max-h-[95vh]"
      style={{
        willChange: 'transform'
      }}>
      
      {/* Background layers */}
      <CircuitBackground />
      <TechHUD />

      {/* Scanning beam */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none z-20"
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'linear',
          delay: T.hud
        }}
        style={{
          boxShadow: '0 0 12px rgba(0, 212, 255, 0.6)'
        }} />
      

      {/* Shooting stars (just 2, light) */}
      {[0, 1].map((i) =>
      <motion.div
        key={`star-${i}`}
        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
        style={{
          top: `${20 + i * 30}%`,
          left: '-10%',
          boxShadow: '0 0 8px #00d4ff'
        }}
        animate={{
          x: ['0vw', '120vw'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: T.hud + i * 3,
          repeatDelay: 4,
          ease: 'easeOut'
        }} />

      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-5 sm:p-6 md:p-7">
        {/* Top: URL */}
        <motion.p
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 0.6,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: T.url,
            ease
          }}
          className="text-white/60 text-[10px] tracking-[0.3em] text-center">
          
          WWW.INNOVATIONEXPO.COM
        </motion.p>

        {/* Invited Label */}
        <motion.div
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: T.label,
            ease
          }}
          className="text-center mt-3">
          
          <span className="text-cyan-300/80 text-[10px] tracking-[0.4em] font-semibold">
            ── YOU ARE CORDIALLY INVITED TO ──
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tight text-center mt-3 overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              x: -200,
              filter: 'blur(8px)'
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.7,
              delay: T.title1,
              ease
            }}>
            
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                '0 0 20px rgba(0, 212, 255, 0.3)',
                '0 0 35px rgba(0, 212, 255, 0.6)',
                '0 0 20px rgba(0, 212, 255, 0.3)']

              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: T.title1 + 0.7
              }}>
              
              INNOVATION &
            </motion.span>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 200,
              filter: 'blur(8px)'
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.7,
              delay: T.title2,
              ease
            }}>
            
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                '0 0 20px rgba(0, 212, 255, 0.3)',
                '0 0 35px rgba(0, 212, 255, 0.6)',
                '0 0 20px rgba(0, 212, 255, 0.3)']

              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: T.title2 + 0.7
              }}>
              
              TECHNOLOGY
            </motion.span>
          </motion.div>
        </h1>

        {/* Animated divider line */}
        <motion.div
          initial={{
            scaleX: 0
          }}
          animate={{
            scaleX: 1
          }}
          transition={{
            duration: 0.6,
            delay: T.divider,
            ease
          }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-8 mt-3 origin-center" />
        

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 0.8,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: T.subtitle,
            ease
          }}
          className="text-white/80 italic text-xs sm:text-sm text-center mt-2">
          
          The Skill Exhibition · Class of 2026
        </motion.p>

        {/* Guest name card */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            delay: T.guest,
            ease
          }}
          className="text-center mt-3">
          
          <p className="text-white/60 text-[10px] tracking-widest">DEAR</p>
          <motion.p
            className="font-display text-white text-lg sm:text-xl font-semibold tracking-wide mt-0.5"
            animate={{
              textShadow: [
              '0 0 8px rgba(0, 212, 255, 0.3)',
              '0 0 16px rgba(0, 212, 255, 0.6)',
              '0 0 8px rgba(0, 212, 255, 0.3)']

            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>
            
            {guestName}
          </motion.p>
        </motion.div>

        {/* Middle — characters + globe */}
        <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 px-1 relative flex-1 min-h-0 mt-2">
          {/* Soft glow under globe */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1,
              scale: [1, 1.2, 1]
            }}
            transition={{
              opacity: {
                duration: 0.5,
                delay: T.globe
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: T.globe
              }
            }} />
          

          {/* Left character */}
          <motion.div
            initial={{
              opacity: 0,
              x: -200
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              delay: T.characters,
              ease
            }}
            className="flex-shrink-0 relative z-10 self-end">
            
            <CharacterLeft />
          </motion.div>

          {/* Globe */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 1,
              delay: T.globe,
              type: 'spring',
              stiffness: 100,
              damping: 14
            }}
            className="flex-shrink-0 relative z-20 self-center">
            
            <AnimatedGlobe />
          </motion.div>

          {/* Right character */}
          <motion.div
            initial={{
              opacity: 0,
              x: 200
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              delay: T.characters,
              ease
            }}
            className="flex-shrink-0 relative z-10 self-end">
            
            <CharacterRight />
          </motion.div>
        </div>

        {/* Event details — Date / Time / Location */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: T.details,
            ease
          }}
          className="grid grid-cols-3 gap-2 mt-3 px-2">
          
          {[
          {
            Icon: Calendar,
            label: 'DATE',
            value: '14 JUN 2026'
          },
          {
            Icon: Clock,
            label: 'TIME',
            value: '9:00 AM'
          },
          {
            Icon: MapPin,
            label: 'VENUE',
            value: 'Tech Hall A'
          }].
          map((item, i) =>
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 15
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: T.details + i * 0.12,
              ease
            }}
            className="flex flex-col items-center text-center bg-[#3b5fc9]/15 backdrop-blur-sm rounded-lg border border-cyan-400/20 py-2 px-1">
            
              <item.Icon className="w-3.5 h-3.5 text-cyan-300 mb-1" />
              <p className="text-cyan-300/70 text-[8px] tracking-[0.2em] font-semibold">
                {item.label}
              </p>
              <p className="text-white text-[10px] sm:text-xs font-medium mt-0.5 leading-tight">
                {item.value}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Organizer */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: T.organizer,
            ease
          }}
          className="text-center mt-3">
          
          <p className="text-cyan-300/70 text-[9px] tracking-[0.3em] font-semibold">
            HOSTED BY
          </p>
          <p className="text-white/90 text-xs sm:text-sm font-semibold mt-0.5 tracking-wide">
            Tech Innovators Society
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            delay: T.footer,
            ease
          }}
          className="text-center mt-2 pt-2 border-t border-cyan-400/15">
          
          <p className="text-white/50 text-[9px] tracking-wider">
            RSVP · +0282 12345-678
          </p>
        </motion.div>
      </div>

      {/* Corner brackets */}
      {[
      {
        top: 6,
        left: 6,
        rotate: 0
      },
      {
        top: 6,
        right: 6,
        rotate: 90
      },
      {
        bottom: 6,
        right: 6,
        rotate: 180
      },
      {
        bottom: 6,
        left: 6,
        rotate: 270
      }].
      map((pos, i) =>
      <motion.div
        key={`corner-${i}`}
        className="absolute w-5 h-5 pointer-events-none"
        style={pos}
        initial={{
          opacity: 0,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.4,
          delay: T.hud + i * 0.08
        }}>
        
          <motion.div
          className="w-full h-full"
          style={{
            rotate: pos.rotate
          }}
          animate={{
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3
          }}>
          
            <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>);

}