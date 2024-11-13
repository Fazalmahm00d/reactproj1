import { createSlice } from "@reduxjs/toolkit";



const authSlice=createSlice(
    {
        name:"Authenticator",
        initialState:{
            isEmail:localStorage.getItem('email'),
            isAuthenticate:localStorage.getItem('token')
        },
        reducers:{
            logIn(state){
                state.isEmail=true;
            },
            logOut(state){
                state.isEmail=false;
            },
            changeEmailValue(state,actions){
                state.isEmail=actions.payload;
            },
            changeTokenValue(state,actions){
                state.isAuthenticate=actions.payload;
            }
        }
    }
)

export const authReducer=authSlice.reducer;

export const authActions=authSlice.actions;