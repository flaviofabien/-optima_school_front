import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataStorageUserType, UserDatastorageType } from "../../typescript/Store";

const getTokenFromStorage = () => {
   return localStorage.getItem("userToken") || "";
};

 const initialState : DataStorageUserType = {
    token : getTokenFromStorage(),
    alert : {
      status : false,
      message : ""
    },
    user : {
      id : 0,
      nom : "",
      prenom : "",
      email : '',
      role : undefined
    },
 }

 export const DataStorage = createSlice({
    name : "token",
    initialState , 
    reducers : {
        setToken: (state : DataStorageUserType , action: PayloadAction<string>) => {
           state.token = action.payload;
           localStorage.setItem("userToken", action.payload);
        },
        setAlert: (state, action: PayloadAction<{ status: boolean, message: string }>) => {
           state.alert.status = action.payload.status;
           state.alert.message = action.payload.message;
        },
        setUsers: (state : DataStorageUserType, action: PayloadAction<UserDatastorageType>) => { 
           state.user =  action.payload;
        },

        
    }
 })

export const { setToken ,setAlert , setUsers  } = DataStorage.actions;

export default DataStorage.reducer;