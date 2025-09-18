import axios from "axios"
import { IP } from "./IP"
import type { FormDataClasseEditType } from "../Zod-Validation/Classe"

export const getAllClasses  = async (
    token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/classes" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })        
    return res.data
}

export const getOneClasses  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/classe/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateClasses  = async (token : string,newUser : FormDataClasseEditType) => {
    const res = await axios.post( IP + "/classes", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateClasses  = async (token : string,newUser : FormDataClasseEditType,id : string) => {
    const res = await axios.put( IP + "/classe/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteClasses  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/classe/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
