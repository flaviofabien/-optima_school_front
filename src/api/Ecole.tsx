import axios from "axios"
import { IP } from "./IP"
import type { FormDataEcoleEditType, FormDataEcoleType } from "../Zod-Validation/Ecole"

export const getAllEcoles  = async (token : string) => {
    const res = await axios.get( IP + "/ecoles" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    console.log(res.data.data);
    
    return res.data.data
}

export const getOneEcoles  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/ecole/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateEcoles  = async (token : string,newUser : FormDataEcoleType) => {
    const res = await axios.post( IP + "/ecoles", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateEcoles  = async (token : string,newUser : FormDataEcoleEditType,id : string) => {
    const res = await axios.put( IP + "/ecole/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteEcoles  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/ecole/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
