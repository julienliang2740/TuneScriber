import React from 'react';
import { motion } from 'framer-motion';
import PlayerComponent from './PlayerComponent';
import './styles.css';

// Import images
import leftImage from './score.png';
import rightImage from './score.png';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textAnimation = {
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 0.9,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

function Result() {
  const audioFiles = [
    { fileName: 'music.mp3', audioSrc: '/audio/music.mp3', delay: 0 },
    { fileName: 'drums.mp3', audioSrc: '/audio/drums.mp3', delay: 0.3 },
    { fileName: 'bass.wav', audioSrc: '/audio/bass.wav', delay: 0.6 },
    { fileName: 'guitar.mp3', audioSrc: '/audio/guitar.mp3', delay: 0.9 },
  ];

  return (
    <div className="mt-12 relative min-h-screen text-center text-white">
      <motion.h1
        className="text-5xl font-medium opacity-70 mb-8"
        variants={textAnimation}
        initial="hidden"
        animate="show"
      >
        Enjoy your sheet music!
      </motion.h1>
      <motion.div
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {audioFiles.map((audio, index) => (
          <PlayerComponent 
            key={index}
            fileName={audio.fileName}
            audioSrc={audio.audioSrc}
            delay={audio.delay}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Result;