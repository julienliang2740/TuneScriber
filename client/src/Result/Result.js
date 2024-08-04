import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PlayerComponent from './PlayerComponent';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [files, setFiles] = useState({});

  // Retrieve files from localStorage if they exist
  useEffect(() => {
    const storedFiles = localStorage.getItem('files');
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  // Save files to localStorage if passed via location.state
  useEffect(() => {
    if (location.state && location.state.files) {
      setFiles(location.state.files);
      localStorage.setItem('files', JSON.stringify(location.state.files));
    }
  }, [location.state]);


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
			{files && Object.keys(files).map((fileName, index) => (
            <PlayerComponent 
              key={index}
              fileName={fileName}
              audioSrc={files[fileName]}
              delay={index * 0.3}  // Adjust delay dynamically based on index
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