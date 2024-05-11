import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { types } from "../../services/types";
import { useDispatch, useSelector } from "react-redux";
import { updateType } from "../../features/Pokemon/pokemonSlice";
import { useNavigate} from "react-router-dom";


function Search() {
    const selectref = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {pokemontype} = useSelector(state => state.pokemon);

    const [val,setVal] = useState('all');
    const [searchedPokemon, setSearchedPokemon] = useState();
    

    useEffect(()=>{
        setVal(pokemontype);
    },[pokemontype])

    const handleTypes = () =>{
        const selected = selectref.current.value;
        dispatch(updateType(selected));
    }

    const getSinglePokemon = () =>{
      if(searchedPokemon!==undefined){
        navigate(`/${searchedPokemon}`);
      }
    }

    const handleSearchInput = (event) =>{
        setSearchedPokemon(event.target.value); 
    }


  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-1/2 text-sm p-4 flex flex-col items-center justify-around bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 md:flex-row">
        <div className="flex p-2 rounded-xl bg-gray-100 mb-2 overflow-hidden md:mb-0 w-[70%] md:w-2/5">
          <FontAwesomeIcon className="text-gray-400 mr-2 mt-1" icon={faMagnifyingGlass} />
          <input
            className="bg-gray-100 outline-none "
            type="text"
            placeholder="Name or Id . . ."
            onChange={handleSearchInput}
          />
        </div>
        <div className="bg-[#999999] px-2 py-1 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
            <button onClick={getSinglePokemon}>Search</button>
        </div>
        <div className="pointer-events-auto mb-2 md:mb-0">
            <FontAwesomeIcon icon={faAngleDown}/>
            <select value={val} ref={selectref} onChange={handleTypes} className={`appearance-none text-center px-1 focus:outline-none`}>
                <option value='all'>all</option>
                {
                    types.map(type => <option key={type}>{type}</option>)
                }
           </select>
           <span>catagory</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
