import React from 'react'
import image from '../../asset/pikachu-running.gif'

function LoadingPage() {
  return (
    <div className='flex space-x-2 justify-center  items-center h-screen'>
		    <img className='h-32' src={image} />
	  </div>
  )
}

export default LoadingPage