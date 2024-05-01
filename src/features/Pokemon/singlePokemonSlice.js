import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState ={
    loading : false,
    pokemon : {},
    error: {}, //be remember error here is an object not a string
}


export const fetchSinglePokemon = createAsyncThunk('singlepokemon/fetchSinglePokemon' , async(nameorid,{dispatch, getState}) => {
        await new Promise (resolve => setTimeout(resolve, 1000)); // loading screen for one seccond
        const url = `https://pokeapi.co/api/v2/pokemon/${nameorid}`
        const response = await axios.get(url);
        return response.data;
   
})



const singlePokemonSlice = createSlice({
    name : 'singlepokemon',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchSinglePokemon.fulfilled, (state,action) => {
            state.loading = false
            state.pokemon = action.payload
            state.error =''
        })
    
    }

})

export default singlePokemonSlice.reducer