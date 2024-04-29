import React from 'react'
import image from '../../asset/pikachu.gif'

function LoadingScreen() {
  return (
    <div className='flex space-x-2 justify-center  items-center h-screen'>
		<img className='h-20' src={image} />
	</div>
  )
}

export default LoadingScreen