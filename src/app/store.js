//for react 
import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/Pokemon/pokemonSlice'

const store = configureStore({
    reducer : {
        pokemon : pokemonReducer
    },

})

export default store