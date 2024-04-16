import React from 'react'

function Buttons({pagination}) {

    const{previous, next, prevurl, nexturl}=pagination;

  return (
    <div className='my-3 text-white'>
        {prevurl && <button className='bg-slate-600 mr-5 w-24 rounded-full tracking-wide' onClick={previous}>Previous</button>}
        {nexturl&& <button className='bg-slate-600 ml-5 w-24 rounded-full tracking-wide' onClick={next}>Next</button>}
    </div>
  )
}

export default Buttons;