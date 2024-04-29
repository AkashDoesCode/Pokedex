import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { types } from "./service";


function Search() {
    // const[width, setWidth] = useState();
    const selectref = useRef(null)

    // const handleWidth = () => {
    //     const option = selectref.current.selectedOptions[0].textContent;
    //     console.log(option);
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     context.font = "19.2px";
    //     const textWidth = context.measureText(option).width+20;
    //     const formattedWidth = Math.ceil(textWidth)+'px';
    //     const modifiedWidth = `w-[${formattedWidth}]`
    //     console.log(modifiedWidth);
    //     setWidth(modifiedWidth);
        
    // }
    // useEffect(()=>{
    //     handleWidth();
    // },[])

    const handleTypes = () =>{
        console.log(selectref.current.value);
    }

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-1/2 p-4 flex flex-col items-center justify-around bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 md:flex-row">
        <div className="p-2 rounded-xl bg-gray-100 mb-2 md:mb-0">
          <FontAwesomeIcon className="text-gray-400 mr-2" icon={faMagnifyingGlass} />
          <input
            className="bg-gray-100 outline-none"
            type="text"
            placeholder="Pokemon name . . ."
          />
        </div>
        <div className="bg-[#999999] px-2 py-1 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
          <span>Search</span>
        </div>
        <div className="cursor-pointer mb-2 md:mb-0">
            <FontAwesomeIcon icon={faAngleUp}/>
            <select ref={selectref} onChange={handleTypes} className={`appearance-none text-center px-1 focus:outline-none`}>
                <option value='all'>All</option>
                {
                    types.map(type => <option key={type} value={type}>{type[0].toUpperCase()+type.slice(1)}</option>)
                }
           </select>
           <span>Catagory</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
