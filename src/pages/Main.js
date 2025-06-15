import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pokecard from "../Component/Card/Pokecard";
import Buttons from "../Component/Card/Buttons";
import Search from "../Component/Card/Search";
import LoadingPage from "../Component/Card/LodingPage";
import ErrorPage from "../Component/Card/ErrorPage";

import {
  fetchTypePokemons,
  updatePokemonsAfterDrag,
} from "../features/Pokemon/pokemonSlice";
import { fetchPokemons } from "../features/Pokemon/pokemonSlice";
import Header from "./Header";
import Footer from "./Footer";
import Bot from "../Component/ChatBot/Bot";
import { ToastContainer } from "react-toastify";

const Mainpage = () => {
  const dispatch = useDispatch();
  const { loading, error, pokemontype } = useSelector((state) => state.pokemon);
  const { pokemons, url, nextUrl, prevUrl } = useSelector(
    (state) => state.pokemon.data
  );
  
 


  useEffect(() => {
    if (pokemontype === "all") dispatch(fetchPokemons());
    else dispatch(fetchTypePokemons());
  }, [url, pokemontype]);

  const dragComponent = useRef();
  const dropComponent = useRef();

  const handleDrag = () => {
    const pokemonsClone = [...pokemons];
    const temp = pokemonsClone[dragComponent.current];
    pokemonsClone[dragComponent.current] = pokemonsClone[dropComponent.current];
    pokemonsClone[dropComponent.current] = temp;
    dispatch(updatePokemonsAfterDrag(pokemonsClone));
  };

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && error ? <ErrorPage /> : null}
      {!loading && pokemons.length ? (
        <>
          <Header />
          <Search />
          <Bot />
          <div className="flex justify-center flex-wrap">
            {pokemons &&
              pokemons.map((pokemon, index) => (
                <div
                  key={pokemon.id}
                  draggable
                  onDragStart={() => (dragComponent.current = index)}
                  onDragEnter={() => (dropComponent.current = index)}
                  onDragEnd={handleDrag}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Pokecard pokemon={pokemon} />
                </div>
              ))}
          </div>
          {pokemontype === "all" && <Buttons event={{ nextUrl, prevUrl }} />}
          <Footer />
        </>
      ) : null}
      <ToastContainer />
    </>
  );
};
export default Mainpage;
