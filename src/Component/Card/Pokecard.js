import React, { useEffect, useState } from "react";
import getColor from './service'
import './Pokecard.css'

const Pokecard = (pokemon)=>{
   const{id,name, abilities, height, weight, stats, sprites, types}=pokemon.pokemon;
    
    return (
       <>
        <div  className= 'relative bg-white w-48 p-2 m-4 rounded-3xl shadow-2xl shadow-black-500/50'>

            <div className= 'absolute right-3 top-3 bg-black px-2 rounded-3xl text-white text-sm'>{id}</div>

            <img className="block m-auto mt-4 h-36 p-2" src={sprites.other.dream_world.front_default} />

            <p className= 'text-center font-semibold'>{name}</p>

            <div className="flex justify-evenly mt-2 mb-4">
                {
                    types.map(type =>   <span key={type.type.name} className= {`${getColor(type.type.name)} rounded-2xl text-sm px-1.5 pb-1 text-white tracking-widest`}>
                    {type.type.name}</span>)
                }
              
            </div>

            <div className='flex align items-center justify-between text-center text-xs pb-2'>
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