import axios from "axios"
import { IP } from "./IP"
import type { FormDataTeachType } from "../Zod-Validation/Teach"

export const getAllTeachs  = async (token : string) => {
    const res = await axios.get( IP + "/teachs" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getOneTeachs  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/teach/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateTeachs  = async (token : string,newUser : FormDataTeachType) => {
    const res = await axios.post( IP + "/teachs", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateTeachs  = async (token : string,newUser : string,id : string) => {
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
