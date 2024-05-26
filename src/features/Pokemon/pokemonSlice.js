import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState ={
    loading : false,
    data : {
        pokemons : [],
        url : 'https://pokeapi.co/api/v2/pokemon?limit=8',
        prevUrl: '',
        nextUrl: ''
    },
    error: {}, //be remember error here is an object not a string
    pokemontype : 'all'
}


export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons' , async(_,{dispatch, getState}) => {
        await new Promise (resolve => setTimeout(resolve, 1000)); // loading screen for one seccond
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

export const fetchTypePokemons = createAsyncThunk('pokemon/fetchTypePokemons' , async(_,{getState}) => {
    //await new Promise (resolve => setTimeout(resolve, 1000)); // loading screen for one seccond
    const pokemontype= getState().pokemon.pokemontype;
    if(pokemontype === 'all') return ;

    const url = 'https://pokeapi.co/api/v2/type/' + pokemontype;
    const response = await axios.get(url);
    const {pokemon} = response.data; 
    const data = pokemon;


    const newData = await Promise.all(
        data.map(async p =>{
            let pokemon = await axios.get(p.pokemon.url);
            return pokemon.data
        })
    )
    return newData

})

const pokemonSlice = createSlice({
    name : 'pokemon',
    initialState,
    reducers : {
        saveUrl : (state,action) =>{
            state.data.prevUrl=action.payload.previous
            state.data.nextUrl=action.payload.next
        },
        updateUrl : (state,action) =>{
            state.data.url=action.payload;
            state.data.pokemons=[]
        },
        updateType : (state, action) =>{
            state.pokemontype = action.payload
        },
        updatePokemonsAfterDrag : (state, action) =>{
            state.data.pokemons = action.payload
        }
       
    },
    extraReducers : builder => {
        //for all pokemon
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
            state.error = action.error

        })

        //for any typed pokemon

        builder.addCase(fetchTypePokemons.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTypePokemons.fulfilled, (state,action) => {
            state.loading = false
            state.data.pokemons = action.payload
            state.error =''
        })
        builder.addCase(fetchTypePokemons.rejected,(state,action)=>{
            state.loading =false
            state.data.pokemons = []
            state.error = action.error
        })
    }

})

export default pokemonSlice.reducer
export const {saveUrl, updateUrl, updateType, updatePokemonsAfterDrag} = pokemonSlice.actions