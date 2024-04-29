import React from 'react'
import { useSelector } from 'react-redux'
import image from '../../asset/pikachu-crying.gif'

function ErrorPage() {
    const {error} = useSelector(state => state.pokemon)
    console.log(error)
  return (
    <div className='flex flex-col justify-center items-center h-screen p-16 bg-white gap-8'>
        <img className='h-32' src={image}/>
        <h3 className='font-extrabold text-5xl text-gray-600'> Something Went Wrong!</h3>
        <p className='text-2xl text-gray-400'>{error.code}</p>
        <p className='text-2xl text-gray-400'>{error.message}</p>

    </div>
  
  )
}

export default ErrorPage