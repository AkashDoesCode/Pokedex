import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokecard from "./Pokecard";
import Buttons from "./Buttons";
import Search from "./Search";
import { useSelector, useDispatch} from 'react-redux'
import { fetchPokemons } from '../../features/Pokemon/pokemonSlice';
import LoadingScreen from "./LodingScreen";

const Mainpage= ()=>{
    const {loading,error} = useSelector(state =>state.pokemon)
    //console.log(loading);
    const {pokemons, url, nextUrl, prevUrl}  = useSelector(state => state.pokemon.data)
    console.log(pokemons);
    const dispatch = useDispatch();

    useEffect(()=>{
            dispatch(fetchPokemons());
    },[url])

    // const[pokedata, setPokedata]=useState(null);
    // const[url, setUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    // const[nexturl, setNexturl]=useState();
    // const[prevurl,setPrevurl]=useState();


    // const loadpokemon= async (data) => {
    //     let pokemon= await Promise.all(data.map(async p => {
    //         let _p=await axios.get(p.url)
    //         return _p
    //     }))
    //     setPokedata(pokemon);
    // }

    // useEffect(()=>{
        
    //     axios.get(url).then(res=>{
    //         loadpokemon(res.data.results);
    //         setNexturl(res.data.next);
    //         setPrevurl(res.data.previous);
    //     }).catch(err=>{
    //         console.log('err');
    //     })

        // async function fetchPokedata(){
        //     const response= await axios.get(url)
        //     setNexturl(response.data.next);
        //     setPrevurl(response.data.previous);
        //     await loadpokemon(response.data.results)
        // }
        // fetchPokedata();
    //},[url]);

    // const pagination = {
    //     previous: ()=>{
    //         setUrl(prevurl);
    //     },
    //     next: ()=>{
    //         setUrl(nexturl);
    //     },
    //     prevurl : prevurl,
    //     nexturl : nexturl
    // }

    return(
        <>
            {loading && <LoadingScreen />}
            {!loading && error? <div>{error}</div>:null}
            {!loading && pokemons.length?(
                <>
                    <Search />    
                    <div className="flex justify-center flex-wrap">
                      {
                         pokemons && pokemons.map(pokemon=> <Pokecard key={pokemon.id} pokemon={pokemon} />)
                      }
                    </div>
                    <Buttons event={{nextUrl, prevUrl}}/>
                </>

            ):null}          
        </>
        
    )
}
export default Mainpage