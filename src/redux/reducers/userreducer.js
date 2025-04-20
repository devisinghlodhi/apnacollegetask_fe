import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  userdata : null,
  token: null,
}

export const userReducer = createReducer(initialState , 
  
  (builder) => {
    builder
      .addMatcher((action)=>{return action.type === "login"}, (state, action) => {
        state.isLogin = true;
        state.userdata = action.payload.user;
        state.token = action.payload.token;
      })

      .addMatcher((action)=>{return action.type === "logout"}, (state, action) => {
        state.isLogin = false; 
        state.userdata = null;
        state.token = null;
      })  
  }
  
)
