import React from 'react'
import { useDispatch } from 'react-redux'
import { changeUrl} from '../../features/Pokemon/pokemonSlice';

function Buttons({event}) {

    //const{previous, next, prevurl, nexturl}=pagination;
    const dispatch = useDispatch();
    const {nextUrl, prevUrl} = event

   const previous = () =>{
        dispatch(changeUrl(prevUrl));
   }

   const next = () =>{
        dispatch(changeUrl(nextUrl));
   }

  return (
    <div className='my-3 text-white'>
        {prevUrl && <button className='bg-slate-600 mr-5 w-24 rounded-full tracking-wide' onClick={previous}>Previous</button>}
        {nextUrl&& <button className='bg-slate-600 ml-5 w-24 rounded-full tracking-wide' onClick={next}>Next</button>}
    </div>
  )
}

export default Buttons;