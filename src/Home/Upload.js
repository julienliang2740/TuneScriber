import { Button } from '@radix-ui/themes'
import React from 'react'

const Upload = () => {
	const uploadFile = () => {
		document.getElementById('file-input').click();
	}

	const fileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			console.log(file);
		}
	}

	return (
		<div className='bg-opacity-15 bg-white p-2 rounded-lg m-5 border-white border border-opacity-100'>
			<div className='border-white border border-opacity-100 pb-12 pt-12 pr-20 pl-20 rounded-lg border-dashed'>
				<button className='bg-violet font-inter rounded-lg pt-4 pb-4 pr-10 pl-10 text-small hover:bg-purple' id="upload-button" onClick={uploadFile}>
					Upload file
				</button>
				<p className='font-inter text-small mt-1'>or drop the file here</p>
				<input type="file" className='hidden' id='file-input' onChange={fileChange}></input>
			</div>
		</div>
	)
}

export default Upload