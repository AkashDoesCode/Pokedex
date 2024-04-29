import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState ={
    loading : false,
    data : {
        pokemons :[],
        url : 'https://pokeapi.co/api/v2/pokemon?limit=8',
        prevUrl: '',
        nextUrl: ''
    },
    error: ''
}


export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons' , async(_,{dispatch, getState}) => {
    //console.log(getState().pokemon.data.url);
    await new Promise (resolve => setTimeout(resolve, 1000));
    const url = getState().pokemon.data.url;
    const response = await axios.get(url);
    const {next, previous, results} = response.data; 
    const data = results;

    dispatch(saveUrl({previous, next}));

    const newData = await Promise.all(
        data.map(async p =>{
            let pokemon = await axios.get(p.url);
            return pokemon.data
        })
    )
    return newData
})

//export const saveUrl = createAction('pokemon/saveUrl');

const pokemonSlice = createSlice({
    name : 'pokemon',
    initialState,
    reducers : {
        saveUrl : (state,action) =>{
            state.data.prevUrl=action.payload.previous
            state.data.nextUrl=action.payload.next
        },
        changeUrl : (state,action) =>{
            state.data.url=action.payload;
            state.data.pokemons=[]
        }
       
    },
    extraReducers : builder => {
      
        builder.addCase(fetchPokemons.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPokemons.fulfilled, (state,action) => {
            state.loading = false
            state.data.pokemons = action.payload
            state.error =''
        })
        builder.addCase(fetchPokemons.rejected,(state,action)=>{
            state.loading =false
            state.data.pokemons = []
            state.error = action.error.message
        })
    }

})

export default pokemonSlice.reducer
export const {saveUrl, changeUrl} = pokemonSlice.actions