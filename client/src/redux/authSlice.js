import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isLoggedIn : false
    },
    reducers : {
        login : (state ,action)=>{
            state.user = action.payload.user
            state.isLoggedIn = true 
        },
        logout : (state , action)=>{
            state.user = null,
            state.isLoggedIn = false
            
        }
    }

})

export default authSlice.reducer
export const {login , logout}  = authSlice.actions