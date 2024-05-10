import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
        <div className='text-center text-gray-500 mt-10'>
             <h1 className='text-4xl mb-2 font-bold'>Gotta Catch 'em all!</h1>
             <p className='font-semibold font-mono mb-3'>Made with<span className='text-red-600 mx-2'>&#10084;</span> by Akash</p>
             <a href='https://github.com/AkashDoesCode' className='inline-block mb-3 p-1 rounded-md font-mono bg-gray-500 text-white'><FontAwesomeIcon className='px-1' icon={faGithub}/>Github</a>
        </div>
       
   
  )
}

export default Footer