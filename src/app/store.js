//for react 
import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/Pokemon/pokemonSlice'
import singlePokemonReducer from '../features/Pokemon/singlePokemonSlice'

const store = configureStore({
    reducer : {
        pokemon : pokemonReducer,
        singlepokemon : singlePokemonReducer
    },

})

export default store