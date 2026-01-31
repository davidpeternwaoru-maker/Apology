import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface IntroProps {
  onNext: () => void;
}

const Intro: React.FC<IntroProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glass-card p-8 md:p-12 rounded-3xl max-w-2xl w-full"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 bg-white/10 rounded-full">
            <Heart className="w-8 h-8 text-rose-300 fill-rose-300/50" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-purple-200"
        >
          I'm Sorry
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-4 text-lg md:text-xl text-gray-200 font-light leading-relaxed"
        >
          <p>
            Sometimes words aren't enough to express how much I value what we have.
            Distance makes things harder, but it also makes every moment matter more.
          </p>
          <p>
            I messed up, and I want to make it right. Not just because it's Valentine's, 
            but because it's <span className="font-serif italic text-rose-200">us</span>.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          onClick={onNext}
          className="mt-10 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium tracking-wide transition-all duration-300 group"
        >
          Let me show you <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Intro;