import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { PURGE } from 'redux-persist';
import {auth} from '../../firebase'



const initialState ={
    loading : false,
    userInfo : null,
    error: null, 
    success : false,
    registered : false
}


export const registerUser = createAsyncThunk('auth/registerUser' , async({email, password}) => {
    await createUserWithEmailAndPassword(auth, email, password);
})

export const loginUser = createAsyncThunk('auth/loginUser' , async({email, password},{getState}) => {
    return await signInWithEmailAndPassword(auth, email, password);
})




const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        isLoggedIn : (state, action)=>{
            state.success = action.payload;
        },
        failedLoginHideErrorIncaseReload : (state, action)=>{
            state.error= null;
        },
        onSuccessfulRegisterHideSuccessMsgIncaseReload : (state, action) =>{
            state.registered = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false
            state.registered = true;
            console.log(action)
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.loading =false
            state.error = action.error

        })
    
    //login
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    builder.addCase(loginUser.fulfilled, (state,action) => {
        state.loading = false
        state.userInfo = action.payload;
        state.success = true;
       
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
        state.loading =false;
        state.error = action.error;

    })

    //logout
    builder.addCase(PURGE, () =>
       initialState
    )
    
}

})

export const {isLoggedIn, failedLoginHideErrorIncaseReload, onSuccessfulRegisterHideSuccessMsgIncaseReload} = authSlice.actions;
export default authSlice.reducer