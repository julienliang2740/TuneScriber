import React from 'react';
import { motion } from 'framer-motion';
import PlayerComponent from './PlayerComponent';
import './styles.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // Use a smoother easing function
    },
  },
};

const textAnimation = {
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

function Result() {
  return (
    <div className="text-center text-white">
      <motion.h1
        className="text-5xl font-medium  opacity-80 mb-8"
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
        <motion.div variants={item}><PlayerComponent /></motion.div>
        <motion.div variants={item}><PlayerComponent /></motion.div>
        <motion.div variants={item}><PlayerComponent /></motion.div>
        <motion.div variants={item}><PlayerComponent /></motion.div>
      </motion.div>
    </div>
  );
}

export default Result;