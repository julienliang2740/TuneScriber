import { Button } from '@radix-ui/themes'
import React from 'react'

const Upload = () => {
	return (
		<div className='bg-opacity-15 bg-white p-2 rounded-lg m-5 border-white border border-opacity-100'>
			<div className='border-white border border-opacity-100 pb-12 pt-12 pr-20 pl-20 rounded-lg border-dashed'>
				<Button highContrast style={{ 
					backgroundColor: '#252273',
					padding: '25px 40px 25px 40px',
					borderRadius: '0.5em',
					fontFamily: 'Inter',
					fontSize: '18px'
				}}>
					Upload file
				</Button>
				<p className='font-inter text-small mt-1'>or drop the file here</p>
			</div>
		</div>
	)
}

export default Upload