import { Progress } from '@radix-ui/themes';
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDownload } from "react-icons/fa";

const Upload = () => {
	const [file, setFile] = useState('')
	const [dragging, setDragging] = useState(false);
	const [finish, setFinish] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [loading, setLoading] = useState('upload needed');
	const navigate = useNavigate();

	const uploadFile = () => {
		document.getElementById('file-input').click();
	}

	const fileChange = (event) => {
		const file = event.target.files[0];
		
		if (file) {
			setUploaded(true);
			setFile(file.name);
		}
	}

	const hoverFile = (event) => {
		event.preventDefault();
		setDragging(true);
	}

	const leaveFile = (event) => {
		event.preventDefault();
		setDragging(false);
	}

	const dropFiles = (event) => {
		event.preventDefault();
		setDragging(false);
		const file = event.dataTransfer.files[0];
		if (file) {
			setUploaded(true);
			setFile(file.name);
		}
	}

	const startGenerating = () => {
		setLoading('loading');
	}

	const showResults = () => {
		navigate('/result')
	}

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

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 1,
				ease: "easeOut",
			},
		},
	};

	useEffect(() => {
		// fake for now
		if (loading === 'loading') {
			console.log('loading', finish);

			setTimeout(() => {
				setFinish(true);
			  }, 5000)
		}
	}, [loading, finish])

	return (
		<div 
			className='max-w-xxLarge flex flex-col m-1 justify-center items-center'
		>
			<motion.h1 
				className='font-inter opacity-75 text-large font-medium mb-2 ' 
				variants={textAnimation}
				initial="hidden"
        		animate="show"
			>
             Convert Your Favourite Song
            </motion.h1>
			{loading === 'upload needed' && (
				<motion.div 
					className= 'p-2 rounded-lg m-5 border-white border border-opacity-100' 
					variants={container}
					initial="hidden"
        			animate="show"
					onDragOver={hoverFile}
					onDragLeave={leaveFile}
					onDrop={dropFiles}
					style={{ backgroundColor: dragging ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)'}}
				>
					<div 
						className='border-white border border-opacity-100 pb-10 pt-10 pr-15 pl-15 rounded-lg border-dashed xl:w-large w-small h-norm flex flex-col justify-center items-center'
					>
						<input type="file" className='hidden' id='file-input' onChange={fileChange} accept="audio/*"></input>
						{!uploaded && (
							<span className='flex flex-col justify-center items-center'>
								{!dragging && (
									<button className='bg-violet font-inter rounded-lg pt-4 pb-4 pr-10 pl-10 text-small hover:bg-purple' id="upload-button" onClick={uploadFile}>
										Upload file
									</button>
								)}
								{dragging && (
									<FaDownload size={30} color='#252273'/>
								)}
								<p 
									className='font-inter text-small mt-1'
									style={{ color: dragging ? '#252273' : 'white'}}
								>{dragging ? 'Drop the file here' : 'or drop the file here'}</p>
							</span>
						)}
						{uploaded && (
							<span
								onClick={uploadFile}
								className='hover:cursor-pointer hover:opacity-50 items-center flex justify-center mb-4'
							>
								<div className="truncate max-w-small xl:max-w-large sm:max-w-medium whitespace-nowrap overflow-hidden">
									<p className="truncate font-inter text-center">♫ {file}</p>
								</div>
							</span>
						)}

						{uploaded && (
							<span>
								<button 
									className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px]"
									onClick={startGenerating}
								>
									<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
									<span className="font-inter inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-violet hover:bg-purple px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
										Generate
									</span>
								</button>
							</span>
						)}
					</div>
				</motion.div>
			)}
			{loading === 'loading' && !finish && (
				<span className='w-full'>
					<Progress color='green' style={{ height: '20px', marginTop: '10px'}}/>
				</span>
			)}
			{finish && (
				<button 
					className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] mt-5 max-w-small"
					onClick={showResults}
				>
					<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
					<span className="font-inter inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-violet hover:bg-purple px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
						Show Results
					</span>
				</button>
			)}
		</div>
	)
}

export default Upload