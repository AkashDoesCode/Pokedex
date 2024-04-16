import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokecard from "./Pokecard";
import Buttons from "./Buttons";

const Mainpage= ()=>{
    const[pokedata, setPokedata]=useState(null);
    const[url, setUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    const[nexturl, setNexturl]=useState();
    const[prevurl,setPrevurl]=useState();

    const loadpokemon= async (data) => {
        let pokemon= await Promise.all(data.map(async p => {
            let _p=await axios.get(p.url)
            return _p
        }))
        setPokedata(pokemon);
    }

    useEffect(()=>{
        
        async function fetchPokedata(){
            const response= await axios.get(url)
            console.log(response.data.next);
            setNexturl(response.data.next);
            setPrevurl(response.data.previous);
            await loadpokemon(response.data.results)
        }
        fetchPokedata();
    },[url]);

    const pagination = {
        previous: ()=>{
            setUrl(prevurl);
        },
        next: ()=>{
            setUrl(nexturl);
        },
        prevurl : prevurl,
        nexturl : nexturl
    }

    return(
        <>
                <Buttons pagination={pagination}/>
        <div className="flex justify-evenly flex-wrap">
                 {
                    pokedata && pokedata.map(p=> <Pokecard key={p.data.id} pokemon={p.data} />)
                 }
        </div>
    
        </>
        
    )
}
export default Mainpage