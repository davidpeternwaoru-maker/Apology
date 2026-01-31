import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Intro from './components/Intro';
import DistanceMap from './components/DistanceMap';
import MemoryCarousel from './components/MemoryCarousel';
import ValentineQuestion from './components/ValentineQuestion';
import { AppStage } from './types';
import { Music, Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Smooth scroll to top when stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.INTRO:
        return <Intro onNext={() => setStage(AppStage.DISTANCE)} />;
      case AppStage.DISTANCE:
        return <DistanceMap onNext={() => setStage(AppStage.MEMORIES)} />;
      case AppStage.MEMORIES:
        return <MemoryCarousel onNext={() => setStage(AppStage.PROPOSAL)} />;
      case AppStage.PROPOSAL:
        return <ValentineQuestion onYes={() => setStage(AppStage.ACCEPTED)} />;
      case AppStage.ACCEPTED:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 z-10">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="glass-card p-12 rounded-full mb-8 bg-rose-500/20 border-rose-400/30"
            >
              <h1 className="text-5xl md:text-8xl">🥰</h1>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white mb-6"
            >
              See you soon, my love.
            </motion.h1>
            <p className="text-xl text-rose-200">Checking flights to Kigali... ✈️</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-rose-500/30">
      <Background />
      
      {/* Audio Element - Optional gentle BG music */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_244f77c4a1.mp3?filename=gentle-piano-124021.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all"
      >
        {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress Indicator */}
      {stage !== AppStage.ACCEPTED && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex space-x-2">
          {Object.values(AppStage).slice(0, 4).map((s, i) => (
            <div 
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                Object.values(AppStage).indexOf(stage) >= i 
                  ? 'w-8 bg-rose-400' 
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;