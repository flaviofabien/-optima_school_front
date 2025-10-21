import axios from "axios"
import { IP } from "./IP"
import type { FormDataClasseEditType } from "../Zod-Validation/Classe"

export const getAllNiveaux  = async (
    token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/niveaux" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })        
    return res.data
}

export const getOneNiveau  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/niveau/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateNiveaux  = async (token : string,newUser : FormDataClasseEditType) => {
    const res = await axios.post( IP + "/niveaux", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateNiveau  = async (token : string,newUser : FormDataClasseEditType,id : string) => {
    const res = await axios.put( IP + "/niveau/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteNiveau  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/niveau/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
