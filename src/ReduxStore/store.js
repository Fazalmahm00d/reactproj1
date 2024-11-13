import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authentication";

const store=configureStore({
    reducer:{
        authReducer,
    }
})

export default store;