import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useSelector } from 'react-redux'
import { getColor } from '../../services/getColor'; 

function EvolutionChain() {
    const { evolution }= useSelector((state) => state.evolution)
    const {pokemon} = useSelector((state) =>state.singlepokemon);
    const evolutionchain =[];

    const extractPokemonNameAndId =(pokemon) =>{
      const pokemonName = pokemon.name;
      const extractURL =  pokemon.url.split('/');
      const pokemonId = extractURL[extractURL.length-2];
      const pokemonNameAndId = {pokemonName, pokemonId}
      evolutionchain.push(pokemonNameAndId);

    }

    if(evolution.id){
      const firstForm = evolution.chain.species;
      extractPokemonNameAndId(firstForm);

      if(evolution.chain.evolves_to.length){
          const secondEvolutionForm = evolution.chain.evolves_to[0].species;
          extractPokemonNameAndId(secondEvolutionForm);

          if(evolution.chain.evolves_to[0].evolves_to.length){
            const thirdEvolutionForm = evolution.chain.evolves_to[0].evolves_to[0].species;
            extractPokemonNameAndId(thirdEvolutionForm);
          }
      }
    }
  return (
    <div>
        {
             evolutionchain.map((p ,index) => 
            <div key={index}>
                <div className={` mx-auto w-[100px] rounded-full text-center text-xs text-white ${getColor(pokemon.types[0].type.name)}`} >
                  <img className='h-16 m-auto' alt='loading...' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.pokemonId}.png`}/>
                  <div className='pb-4'>{p.pokemonName}</div>
                </div>
                <FontAwesomeIcon className={index === evolutionchain.length-1 ?'hidden' : 'block mx-auto my-3'} icon={faChevronCircleDown}/>
            </div>
             
             )  
             
        }
    </div>
  )
}

export default EvolutionChain