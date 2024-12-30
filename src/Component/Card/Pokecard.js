import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
import { getColor } from "../../services/getColor";


const Pokecard = ({pokemon})=>{

   const{id,name,stats, sprites, types}=pokemon;
 

   const pokemonImage = (sprites.other.dream_world.front_default) ? 
   sprites.other.dream_world.front_default : sprites.other.home.front_default;

    

    const navigate = useNavigate();
    const handleNavigate = (name) =>{
        navigate(`/pokemon/${name}`); 
    }
    
    return (
       <>
        <div onClick={() =>handleNavigate(name)}  className= 'relative bg-white w-60 mx-2 my-4 rounded-lg shadow-2xl shadow-black-500/50 scale-95 hover:transform hover:scale-105 transition duration-500 md:flex-row'>

            <div className= 'absolute z-20 right-3 top-3 bg-[#888888] px-2 rounded-3xl text-white text-sm'>#{id}</div>

            <div className={`${getColor(types[0].type.name)} h-40 opacity-60 rounded-t-lg`}></div>

            <LazyLoadImage className="absolute z-10 top-0 left-0 right-0 bottom-0 m-auto mt-4 h-36 p-3" src={pokemonImage} alt="loading..." />
           
    
            <p className= 'text-center font-semibold'>{name}</p>

            <div className="flex justify-evenly mt-2 mb-4">
                {
                    types.map(type =>   <span key={type.type.name} className= {`${getColor(type.type.name)} rounded-2xl text-sm px-1.5 pb-1 text-white tracking-widest`}>
                    {type.type.name}</span>)
                }
              
            </div>

            <div className='flex align items-center justify-between text-center text-xs px-4 pb-4'>
                <div>
                   <h4 className="font-bold">{stats[1].base_stat}</h4>
                    <p className="text-gray-800">Attack</p>
                </div>
                <div>
                   <h4 className="font-bold">{stats[2].base_stat}</h4>
                    <p className="text-gray-800">Defense</p>
                </div>
                <div>
                    <h4 className="font-bold">{stats[0].base_stat}</h4>
                    <p className="text-gray-800">HP</p>
                </div>
                <div>
                     <h4 className="font-bold">{stats[5].base_stat}</h4>
                    <p className="text-gray-800">Speed</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Pokecard;