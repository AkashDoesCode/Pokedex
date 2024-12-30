import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePokemon } from "../features/Pokemon/singlePokemonSlice";
import Search from "../Component/Card/Search";
import { useParams } from "react-router-dom";
import LoadingPage from "../Component/Card/LodingPage";
import ErrorPage from "../Component/Card/ErrorPage";
import Biograpy from "../Component/Card/Biography";
import Stats from "../Component/Card/Stats";
import EvolutionChain from "../Component/Card/EvolutionChain";
import Footer from "./Footer";
import Header from "./Header";
import { getBackgroundImage } from "../services/getBackgroundImage"
import Bot from "../Component/ChatBot/Bot";



function Fullcard() {
  const[isBioActive, setBioActive] = useState(true);
  const[isStatsActive, setStatsActive] = useState(false);
  const[isEvalutionActive , setEvaluationActive] = useState(false);

  const { pokemon, loading , error } = useSelector((state) => state.singlepokemon);
  const {species} = useSelector((state) => state.species);


  const dispatch = useDispatch();
  const param = useParams();
  const pokemonId = param.pokemonId;

  /*why am i using an useffect to fetch single pokemon while i can call this dispatch method before 
  navigating to this page. Now think if user reload the page then all state value will be lost and 
  I can not go back to the previous page to update the state again. This is why I am using useEffect
  to fetch a single pokemon. Now even if the user reload the page, useEffect will dispatch the method
  to get the pokemon object again. To solve this problem we can use localstorage (will implement that 
  in future ) 
  */
  useEffect(() => {
    dispatch(fetchSinglePokemon(pokemonId));
  }, [pokemonId]);
  

  const toggleButton = (event) =>{
      const activeButton = event.target.innerText;
      if(activeButton === 'Bio'){
        setBioActive(true);
        setStatsActive(false);
        setEvaluationActive(false);
      }
      if(activeButton === 'Stats'){
        setBioActive(false);
        setStatsActive(true);
        setEvaluationActive(false);
      }
      if(activeButton === 'Evolution'){
        setBioActive(false);
        setStatsActive(false);
        setEvaluationActive(true);
      }
  }

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && error?<ErrorPage />: null}
      {!loading && pokemon.id? 
      <>
      <Header />
      <Search />
      <Bot />
      <div className="flex justify-center my-7">
        <div className="flex justify-center flex-col bg-white w-1/2 overflow-hidden rounded-lg shadow-2xl shadow-black-500/50 md:flex-row">
          <div
            style={{ backgroundImage: `url(${getBackgroundImage(pokemon.types[0].type.name)})` }}
            className="flex flex-col justify-between bg-cover bg-center w-full md:w-1/2  "
          >
              
              <div className="space-y-2 pl-4 tracking-[2px] text-[#eeeeee] hidden md:block">
                  <div className="text-5xl">#{pokemon.id}</div>
                  <div className="text-sm font-semibold">{species.names[8].name}</div>
                  <div className="text-3xl font-bold">{species.names[2].name}</div>
                  <div className="text-6xl font-extrabold">{species.names[9].name}</div>
              </div>
              <LazyLoadImage 
                className="pb-5 h-44 hover:scale-110 duration-500 ease-in-out"
                src={
                  pokemon.sprites.other.dream_world.front_default ||
                  pokemon.sprites.other.home.front_default
                }
                alt ="loading..."
              />
            
          </div>
          <div className=" w-full md:w-1/2 h-[450px] overflow-auto no-scrollbar">
              <div className="flex justify-between mx-4 my-2">
                <button onClick={toggleButton} className= {isBioActive ? "border-b-2 border-blue-500 text-sm font-medium text-gray-600"  : "text-sm font-medium text-gray-600"}>Bio</button>
                <button onClick={toggleButton} className= {isStatsActive ? "border-b-2 border-blue-500 text-sm font-medium text-gray-600"  : "text-sm font-medium text-gray-600"}>Stats</button>
                <button onClick={toggleButton} className= {isEvalutionActive ? "border-b-2 border-blue-500 text-sm font-medium text-gray-600"  : "text-sm font-medium text-gray-600"}>Evolution</button>
              </div>
              <div className="mt-4 mx-4 text-gray-600">
                { isBioActive && <Biograpy /> }
                { isStatsActive && <Stats />}
                { isEvalutionActive && <EvolutionChain />}
              </div>
          </div>
        </div>
      </div>
      <Footer />
      </> : null}
    </>
  );
}

export default Fullcard;
