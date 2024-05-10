//for react 
import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/Pokemon/pokemonSlice'
import singlePokemonReducer from '../features/Pokemon/singlePokemonSlice'
import speciesReducer from '../features/Pokemon/speciesSlice'
import evolutionReducer from '../features/Pokemon/evolutionSlice'

const store = configureStore({
    reducer : {
        pokemon : pokemonReducer,
        singlepokemon : singlePokemonReducer,
        species : speciesReducer,
        evolution : evolutionReducer,
    },

})

export default store