import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchEvolution } from './evolutionSlice';
import { fetchPokemonSpecies } from './speciesSlice';


const initialState ={
    loading : false,
    pokemon : {},
    error: {}, //be remember error here is an object not a string
}


export const fetchSinglePokemon = createAsyncThunk('singlepokemon/fetchSinglePokemon' , async(nameorid,{dispatch, getState}) => {
        
        const url = `https://pokeapi.co/api/v2/pokemon/${nameorid}`
        const response = await axios.get(url);
        const pokemonId = response.data.id;
        dispatch(fetchPokemonSpecies(pokemonId));
        await new Promise (resolve => setTimeout(resolve, 1000)); // loading screen for one seccond
        return response.data;
   
})



const singlePokemonSlice = createSlice({
    name : 'singlepokemon',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchSinglePokemon.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSinglePokemon.fulfilled, (state,action) => {
            state.loading = false
            state.pokemon = action.payload
            state.error =''
        })
        builder.addCase(fetchSinglePokemon.rejected, (state,action) => {
            state.loading = false
            state.pokemon = {}
            state.error = action.error
        })
    
    }

})

export default singlePokemonSlice.reducer