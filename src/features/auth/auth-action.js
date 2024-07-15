import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = 'https://cms.ourcarediary.com/api/';

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password, c_password }, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const response = await axios.post(
                backendURL + "register",
                {
                    name,
                    email,
                    password,
                    c_password,
                },
                config
            ) 
            return response.data
                   
        } catch (error) {
            if (error.response && error.response.data.message) {
                
                return rejectWithValue(error.response.data)
                
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({email, password},{rejectWithValue}) => {
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const {data} = await axios.post(
                backendURL + "login",
                {email, password},
                config
            )
            localStorage.setItem('userToken', data.userToken)
            return data
        }catch(error){
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)