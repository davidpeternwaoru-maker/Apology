import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion: React.FC<ValentineQuestionProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 100; // approx width
    const btnHeight = 50; // approx height

    // Calculate safe area (so it doesn't go off screen or behind the main text too much)
    // We'll keep it within the container bounds
    const maxW = containerRect.width - btnWidth;
    const maxH = containerRect.height - btnHeight;

    const newX = Math.random() * (maxW - 0) - (maxW / 2);
    const newY = Math.random() * (maxH - 0) - (maxH / 2);

    setNoBtnPosition({ x: newX, y: newY });
    setIsHoveringNo(true);
  };

  const handleYesClick = () => {
    // Fire confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    onYes();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10 overflow-hidden" ref={containerRef}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 md:p-16 rounded-[3rem] text-center max-w-2xl w-full relative"
      >
        <h2 className="text-4xl md:text-6xl font-serif mb-8 text-rose-100 drop-shadow-lg">
          Will you be my Valentine?
        </h2>
        <p className="text-lg text-white/80 mb-12 font-light">
          I promise to make up for every mile between us.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[100px]">
          {/* Yes Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-white text-xl font-bold shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:shadow-[0_0_50px_rgba(225,29,72,0.8)] transition-all z-20"
          >
            YES! 💖
          </motion.button>

          {/* No Button */}
          <motion.button
            animate={{ 
              x: noBtnPosition.x, 
              y: noBtnPosition.y,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="px-12 py-4 bg-white/10 border border-white/20 rounded-full text-white/70 text-xl font-medium backdrop-blur-md hover:bg-white/20 transition-colors z-10"
            style={{ position: isHoveringNo ? 'absolute' : 'relative' }}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ValentineQuestion;