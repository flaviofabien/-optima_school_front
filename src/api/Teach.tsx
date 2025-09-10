import axios from "axios"
import { IP } from "./IP"

export const getAllTeachs  = async (token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined    ) => {
        const res = await axios.get( IP + "/teachs" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const getOneTeachs  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/teach/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateTeachs  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/teachs", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateTeachs  = async (newUser : FormData,token : string,id : string) => {
    const res = await axios.put( IP + "/teach/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteTeachs  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/teach/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
