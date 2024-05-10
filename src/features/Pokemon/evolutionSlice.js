import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState ={
    evolution : {},
}


export const fetchEvolution = createAsyncThunk('evolution/fetchEvolution' , async(url) => {
        const response = await axios.get(url);
        return response.data;
   
})



const evolutionSlice = createSlice({
    name : 'evolution',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchEvolution.fulfilled, (state,action) => {
            state.loading = false
            state.evolution = action.payload
            state.error =''
           
        })
    
    }

})

export default evolutionSlice.reducer