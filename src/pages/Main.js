import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'

import Pokecard from "../Component/Card/Pokecard";
import Buttons from "../Component/Card/Buttons";
import Search from "../Component/Card/Search";
import LoadingPage from "../Component/Card/LodingPage";
import ErrorPage from "../Component/Card/ErrorPage";

import { fetchTypePokemons } from "../features/Pokemon/pokemonSlice";
import { fetchPokemons } from '../features/Pokemon/pokemonSlice';
import Header from "./Header";
import Footer from "./Footer"


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
                    <Header />
                    <Search />    
                    <div className="flex justify-center flex-wrap">
                      {
                         pokemons && pokemons.map(pokemon=> <Pokecard  key={pokemon.id} pokemon={pokemon} />)
                      }
                    </div>
                    {pokemontype =='all' && <Buttons event={{nextUrl, prevUrl}}/>}
                    <Footer />
                </>

            ):null}          
        </>
        
    )
}
export default Mainpage