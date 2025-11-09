import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataStorageUserType, UserDatastorageType } from "../../typescript/Store";

const getTokenFromStorage = () => {
   return localStorage.getItem("userToken") || "";
};
const getMenuFromStorage = () => {
   const menuType = localStorage.getItem("user");
   return menuType ? JSON.parse(menuType) : null;
};

const getUserFromStorage = () => {
   const userString = localStorage.getItem("user");
   return userString ? JSON.parse(userString) : null;
};

 const initialState : DataStorageUserType = {
    token : getTokenFromStorage(),
    menu : getMenuFromStorage(),
    alert : {
      status : false,
      message : ""
    },
    user: getUserFromStorage() || {
      id: 0,
      nom: "",
      prenom: "",
      email: '',
      role: undefined,
      img: "undefined"
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
        setMenu: (state : DataStorageUserType , action: PayloadAction<boolean>) => {
         state.menu = action.payload;
         localStorage.setItem("menu", JSON.stringify(action.payload));
        },
        setAlert: (state, action: PayloadAction<{ status: boolean, message: string }>) => {
           state.alert.status = action.payload.status;
           state.alert.message = action.payload.message;
        },
        setUsers: (state : DataStorageUserType, action: PayloadAction<UserDatastorageType>) => { 
           state.user =  action.payload;
           localStorage.setItem("user", JSON.stringify(action.payload));
        },

        
    }
 })

export const { setToken ,setAlert , setUsers , setMenu  } = DataStorage.actions;

export default DataStorage.reducer;
