import axios from "axios"
import { IP } from "./IP"
import type { FormDataSalleEditType, FormDataSalleType } from "../Zod-Validation/Salles"

export const getAllSalles  = async ( token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/salles" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const getOneSalles  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/salle/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateSalles  = async (token : string,newUser : FormDataSalleType) => {
    const res = await axios.post( IP + "/salles", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateSalles  = async (token : string,newUser : FormDataSalleEditType,id : string) => {
    const res = await axios.put( IP + "/salle/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteSalles  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/salle/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
