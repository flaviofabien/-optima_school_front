import axios from "axios"
import { IP } from "./IP"

export const getAllEcoles  = async (
    token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/ecoles" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
        
    })    
    return res.data
}

export const getOneEcoles  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/ecole/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateEcoles  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/ecoles", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateEcoles  = async (token : string,newUser : FormData,id : string) => {
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
