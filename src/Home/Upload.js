import { Progress } from '@radix-ui/themes';
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Upload = () => {
	const [file, setFile] = useState('')
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

	const startGenerating = () => {
		setLoading('loading');
	}

	const showResults = () => {
		navigate('/result')
	}

	useEffect(() => {
		// fake for now
		if (loading === 'loading') {
			console.log('loading');

			setTimeout(() => {
				setFinish(true);
			  }, 5000)
		}
	}, [loading])

	return (
		<div>
			<h1 className='font-inter opacity-75 text-large font-medium mb-2'>
             Convert Your Favourite Song
            </h1>
			{loading === 'upload needed' && (
				<div className='bg-opacity-15 bg-white p-2 rounded-lg m-5 border-white border border-opacity-100'>
					<div className='border-white border border-opacity-100 pb-12 pt-12 pr-20 pl-20 rounded-lg border-dashed'>
						<input type="file" className='hidden' id='file-input' onChange={fileChange} accept="audio/*"></input>
						{!uploaded && (
							<span>
								<button className='bg-violet font-inter rounded-lg pt-4 pb-4 pr-10 pl-10 text-small hover:bg-purple' id="upload-button" onClick={uploadFile}>
									Upload file
								</button>
								<p className='font-inter text-small mt-1'>or drop the file here</p>
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
				</div>
			)}
			{loading === 'loading' && !finish && (
				<Progress color='green' style={{ height: '20px', marginTop: '10px'}}/>
			)}
			{finish && (
				<button 
				className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] mt-5"
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