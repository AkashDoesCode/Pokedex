import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchEvolution } from './evolutionSlice';


const initialState ={
    loading : false,
    species : {},
    error: {}, //be remember error here is an object not a string
}


export const fetchPokemonSpecies = createAsyncThunk('pokemonspecies/fetchPokemonSpecies' , async(url,{dispatch, getState}) => {
        // const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
        const response = await axios.get(url);
        const evolution_chain_url = response.data.evolution_chain.url;
        dispatch(fetchEvolution(evolution_chain_url));
        return response.data;
   
})



const speciesSlice = createSlice({
    name : 'pokemonspecies',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchPokemonSpecies.fulfilled, (state,action) => {
            state.loading = false
            state.species = action.payload
            state.error =''
        })
    
    }

})

export default speciesSlice.reducer