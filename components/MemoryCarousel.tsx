import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Memory } from '../types';

interface MemoryCarouselProps {
  onNext: () => void;
}

// ============================================================================
// HOW TO ADD YOUR OWN PHOTOS:
// 1. Upload your photos to Google Drive.
// 2. Right-click -> Share -> "Anyone with the link".
// 3. Copy the link and paste it below.
// 
// IF IT STILL FAILS:
// Google Drive sometimes blocks images. Try using https://imgur.com/upload
// instead. Upload there, right-click the image, choose "Copy Image Link", 
// and paste that here.
// ============================================================================

const memories: Memory[] = [
  { 
    id: 1, 
    url: 'https://drive.google.com/file/d/1-VJmTekPEtbNUzVCbGX6i3ENlaXixPI0/view?usp=drive_link', 
    caption: 'The Last day i saw you.' 
  },
  { 
    id: 2, 
    url: 'https://drive.google.com/uc?export=view&id=1OWXPZbVWR-_mHF_WNMBuovQPbYiqVpi0', 
    caption: 'Your birthday last year.' 
  },
  { 
    id: 3, 
    url: 'https://drive.google.com/uc?export=view&id=1Y0EmH2FeKHExfwlV9Ts_uGfwabQAWYaI', 
    caption: 'Thinking of you always.' 
  },
  { 
    id: 4, 
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1920&auto=format&fit=crop', 
    caption: 'Can’t wait to see this view with you.' 
  },
];

const MemoryCarousel: React.FC<MemoryCarouselProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // Helper to convert Google Drive links to a reliable thumbnail URL
  const getImageUrl = (url: string) => {
    // If it's already a direct link (ends in jpg/png/webp) or unsplash, return as is
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.includes('unsplash.com')) {
      return url;
    }

    // Google Drive logic
    if (url.includes('drive.google.com')) {
      let id = '';
      
      // Pattern 1: /file/d/ID/view
      const fileMatch = url.match(/\/file\/d\/([^/]+)/);
      if (fileMatch && fileMatch[1]) id = fileMatch[1];
      
      // Pattern 2: ?id=ID
      const idMatch = url.match(/[?&]id=([^&]+)/);
      if (!id && idMatch && idMatch[1]) id = idMatch[1];

      if (id) {
        // Use the thumbnail endpoint with a large size (w1920) to bypass "virus scan" warnings
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1920`;
      }
    }
    
    return url;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const currentMemory = memories[currentIndex];
  const hasError = imgErrors[currentMemory.id];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-white relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-purple-200">
          Our Memory Lane
        </h2>

        <div className="relative glass-card p-4 md:p-6 rounded-3xl aspect-[4/5] md:aspect-video flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 p-4"
            >
              <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
                 {!hasError ? (
                   <img 
                     src={getImageUrl(currentMemory.url)} 
                     alt={currentMemory.caption}
                     className="w-full h-full object-cover"
                     referrerPolicy="no-referrer"
                     onError={(e) => {
                       console.error("Image failed to load:", currentMemory.url);
                       setImgErrors(prev => ({...prev, [currentMemory.id]: true}));
                     }}
                   />
                 ) : (
                   <div className="flex flex-col items-center text-white/50 p-6 text-center">
                     <ImageOff size={48} className="mb-4" />
                     <p>Image could not load.</p>
                     <p className="text-sm mt-2 max-w-md">
                       If this is a Google Drive link, ensure it is "Anyone with the link". 
                       <br/>
                       Otherwise, try uploading to <b>Imgur.com</b> and copy the direct link.
                     </p>
                   </div>
                 )}
                 
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                    <p className="text-lg md:text-xl font-light text-center text-white font-serif italic">
                      "{currentMemory.caption}"
                    </p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white transition-all z-20"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white transition-all z-20"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {memories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-rose-400' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-rose-500/80 to-purple-600/80 hover:from-rose-500 hover:to-purple-600 rounded-full text-white font-medium shadow-lg shadow-rose-500/20 backdrop-blur-sm transition-all"
            >
              One Last Question...
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCarousel;