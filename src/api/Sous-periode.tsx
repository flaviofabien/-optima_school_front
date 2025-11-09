import axios from "axios"
import { IP } from "./IP"

export const getAllSousPeriode  = async (token : string) => {
    const res = await axios.get( IP + "/sous-periodes" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}


export const getOneSousPeriode  = async (token : string , id : any) => {
    const res = await axios.get( IP + "/sous-periode/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const CreateSousPeriode  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/sous-periodes", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateSousPeriode  = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/sous-periode/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteSousPeriode  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/sous-periode/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
