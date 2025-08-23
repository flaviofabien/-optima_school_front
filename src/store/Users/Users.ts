import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataStorageUserType, UserDatastorageType } from "../../typescript/Store";

   const getTokenFromStorage = () => {
      return localStorage.getItem("userToken") || "";
   };

 const initialState : DataStorageUserType = {
    token : getTokenFromStorage(),
    alert : false,
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
        setAlert: (state : DataStorageUserType, action: PayloadAction<boolean>) => {
           state.alert = action.payload;
        },
        setUsers: (state : DataStorageUserType, action: PayloadAction<UserDatastorageType>) => { 
           state.user =  action.payload;
        }
    }
 })

export const { setToken ,setAlert , setUsers } = DataStorage.actions;

export default DataStorage.reducer;