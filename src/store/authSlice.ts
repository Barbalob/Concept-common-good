import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import Auth from "../api/services/Auth";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { REFRESH } from "../const/constRoutsApi";


interface TypePayloadFetch {
  email:string,
  password:string
}



export const fetchAuthLogin = createAsyncThunk<IUser, TypePayloadFetch, {rejectValue:string}>(
    'auth/fetchAuthLogin',
    async function ({email, password}, { rejectWithValue }){
        try{
          const res = await Auth.login(email, password)
          localStorage.setItem('token', res.data.accessToken)
          return res.data.user
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)
export const fetchAuthRegistration = createAsyncThunk<IUser, TypePayloadFetch, {rejectValue:string}>(
    'auth/fetchAuthRegistration',
    async function ({email, password}, { rejectWithValue }){
        try{
          const res = await Auth.registration(email, password)
          localStorage.setItem('token', res.data.accessToken)
          return res.data.user
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)
export const fetchAuthLogout = createAsyncThunk<void, TypePayloadFetch, {rejectValue:string}>(
    'auth/fetchAuthLogout',
    async function ({}, { rejectWithValue }){
        try{
          await Auth.logout()
          localStorage.removeItem('token')
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)
export const checkAuth = createAsyncThunk<IUser, void, {rejectValue:string}>(
    'auth/checkAuth',
    async function (_, { rejectWithValue }){
        try{
          const res = await axios.get<AuthResponse>(REFRESH, {withCredentials:true})
          localStorage.removeItem('token')
          return res.data.user
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)

interface TypeState {
  user: IUser | {},
  isAuth: boolean,
  isLoading:boolean
}

const initialState: TypeState = {
  user: {},
  isAuth: false,
  isLoading:false
}

const slise = createSlice({
    name:"auth",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthLogin.fulfilled, (state, action)=>{
              state.user = action.payload
              state.isAuth = true
            })
            .addCase(fetchAuthLogin.rejected, (state)=>{
              state.isAuth = false
            })
            .addCase(fetchAuthRegistration.fulfilled, (state, action)=>{
              state.user = action.payload
              state.isAuth = true
            })
            .addCase(fetchAuthRegistration.rejected, (state)=>{
              state.isAuth = false
            })
            .addCase(fetchAuthLogout.fulfilled, (state)=>{
              state.user = {}
              state.isAuth = false
            })
            .addCase(fetchAuthLogout.rejected, (state)=>{
              state.isAuth = false
            })
            .addCase(checkAuth.pending, (state)=>{
              state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state)=>{
              state.user = {}
              state.isAuth = false
              state.isLoading = false
            })
            .addCase(checkAuth.rejected, (state)=>{
              state.isAuth = false
              state.isLoading = false
            })
    }
})

export const {  } = slise.actions
export default slise.reducer