import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokecard from "./Pokecard";
import Buttons from "./Buttons";
import Search from "./Search";
import { useSelector, useDispatch} from 'react-redux'
import { fetchPokemons } from '../../features/Pokemon/pokemonSlice';
import LoadingPage from "./LodingPage";
import ErrorPage from "./ErrorPage";
import { fetchTypePokemons } from "../../features/Pokemon/pokemonSlice";

const Mainpage= ()=>{
    const dispatch = useDispatch();
    const {loading,error,pokemontype} = useSelector(state =>state.pokemon)
    const {pokemons, url, nextUrl, prevUrl}  = useSelector(state => state.pokemon.data)
   

    useEffect(()=>{
        if(pokemontype=='all') dispatch(fetchPokemons());
        else dispatch(fetchTypePokemons());
    },[url, pokemontype])

    

    return(
        <>
            {loading && <LoadingPage />}
            {!loading && error? <ErrorPage />:null}
            {!loading && pokemons.length?(
                <>
                    <Search />    
                    <div className="flex justify-center flex-wrap">
                      {
                         pokemons && pokemons.map(pokemon=> <Pokecard key={pokemon.id} pokemon={pokemon} />)
                      }
                    </div>
                    {pokemontype =='all' && <Buttons event={{nextUrl, prevUrl}}/>}
                </>

            ):null}          
        </>
        
    )
}
export default Mainpage