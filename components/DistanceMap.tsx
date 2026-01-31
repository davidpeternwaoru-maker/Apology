import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface DistanceMapProps {
  onNext: () => void;
}

const DistanceMap: React.FC<DistanceMapProps> = ({ onNext }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Simplified coordinates for visual representation in a 100x100 viewBox
  // Lagos (approx NW) -> Kigali (approx SE)
  const startPoint = { x: 20, y: 30 }; // Lagos
  const endPoint = { x: 80, y: 70 };   // Kigali
  
  // Create a curved path control point
  const controlPoint = { x: 60, y: 20 };

  const pathD = `M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white relative z-10" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="glass-card w-full max-w-4xl p-6 md:p-10 rounded-3xl flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-2 text-center text-rose-100">Miles Apart, Heart Connected</h2>
        <p className="text-white/60 text-center mb-8 max-w-lg">From Lagos to Kigali, no distance is too great for the way I feel about you.</p>

        <div className="relative w-full aspect-[4/3] md:aspect-[2/1] bg-black/20 rounded-2xl overflow-hidden border border-white/5">
          {/* Abstract Map Background Grid */}
          <div className="absolute inset-0" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }} 
          />
          
          {/* SVG Map Visualization */}
          <svg className="absolute inset-0 w-full h-full p-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* The Path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="4 2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Traveling Heart */}
            <motion.circle
              r="1.5"
              fill="#ec4899"
              filter="url(#glow)"
            >
               <animateMotion 
                 dur="3s" 
                 repeatCount="indefinite"
                 path={pathD}
                 rotate="auto"
               />
            </motion.circle>
            
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
          </svg>

          {/* Location Markers */}
          <div className="absolute inset-0 p-10 pointer-events-none">
             {/* Lagos Marker (Positioned using CSS % based on our SVG coords approx) */}
             <motion.div 
               className="absolute flex flex-col items-center"
               style={{ left: '20%', top: '30%', transform: 'translate(-50%, -50%)' }}
               initial={{ scale: 0 }}
               animate={isInView ? { scale: 1 } : { scale: 0 }}
               transition={{ delay: 0.5 }}
             >
               <MapPin className="text-rose-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
               <span className="text-xs md:text-sm font-bold mt-1 tracking-wider text-rose-200">LAGOS</span>
             </motion.div>

             {/* Kigali Marker */}
             <motion.div 
               className="absolute flex flex-col items-center"
               style={{ left: '80%', top: '70%', transform: 'translate(-50%, -50%)' }}
               initial={{ scale: 0 }}
               animate={isInView ? { scale: 1 } : { scale: 0 }}
               transition={{ delay: 2.5 }}
             >
               <MapPin className="text-purple-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
               <span className="text-xs md:text-sm font-bold mt-1 tracking-wider text-purple-200">KIGALI</span>
             </motion.div>
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 3.5 }}
          onClick={onNext}
          className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium tracking-wide transition-all duration-300"
        >
          Remember Us?
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DistanceMap;