import axios from "axios"
import { IP } from "./IP"

export const getAllNotes  = async ( token : string) => {
    const res = await axios.get( IP + "/notes" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })    
    return res.data
}

export const getOneNotes  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/note/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateNotes  = async (token : string,newUser : any) => {
    const res = await axios.post( IP + "/notes", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateNotes  = async (token : string,newUser : any,id : string) => {
    const res = await axios.put( IP + "/note/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteNotes  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/note/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
