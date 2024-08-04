import React from 'react';
import { motion } from 'framer-motion';
import PlayerComponent from './PlayerComponent';
import './styles.css';
import { useNavigate } from 'react-router-dom';

// Import images

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
	const navigate = useNavigate();
	const audioFiles = [
		{ fileName: 'music.mp3', audioSrc: '/audio/music.mp3', delay: 0 },
		{ fileName: 'drums.mp3', audioSrc: '/audio/drums.mp3', delay: 0.3 },
		{ fileName: 'bass.wav', audioSrc: '/audio/bass.wav', delay: 0.6 },
		{ fileName: 'guitar.mp3', audioSrc: '/audio/guitar.mp3', delay: 0.9 },
		{ fileName: 'piano.mp3', audioSrc: '/audio/piano.mp3', delay: 1.2 },
		{ fileName: 'violin.mp3', audioSrc: '/audio/violin.mp3', delay: 1.5 },
	];

	const convertAgain = () => {
		navigate('/');
	}

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
		<div className='mb-12'>
		<motion.div
			className="flex flex-col gap-6 overflow-y-auto max-h-medium pl-5 pr-5 mb-12"
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
		<button 
			className='pr-5 pl-5 pt-2 text-opacity-100 text-white pb-2 rounded-lg border-white border border-opacity-100 hover:border-opacity-50 hover:text-opacity-50'
			onClick={convertAgain}
		>
			Convert another song
		</button>
		</div>
	);
}

export default Result;