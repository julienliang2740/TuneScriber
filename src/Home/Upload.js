import { React, useState } from 'react'

const Upload = () => {
	const [file, setFile] = useState('')
	const [uploaded, setUploaded] = useState(false);

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

	return (
		<div>
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
							className='hover:cursor-pointer hover:opacity-50 items-center flex justify-center mb-3'
						>
							<div className="truncate max-w-small xl:max-w-large sm:max-w-medium whitespace-nowrap overflow-hidden">
								<p className="truncate font-inter text-center">♫ {file}</p>
							</div>
						</span>
					)}

					{ uploaded && (
						<span>
							<button className='bg-violet font-inter rounded-lg pt-4 pb-4 pr-10 pl-10 text-small hover:bg-purple' id="upload-button">
								Generate
							</button>
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default Upload