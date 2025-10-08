import axios from "axios"
import { IP } from "./IP"

export const getAllCategorie  = async (token : string) => {
    const res = await axios.get( IP + "/categories" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}


export const getOneCategorie  = async (token : string , id : any) => {
    const res = await axios.get( IP + "/categorie/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const CreateCategorie  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/categories", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateCategorie  = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/categorie/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteCategorie  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/categorie/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
