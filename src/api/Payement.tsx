import axios from "axios"
import { IP } from "./IP"

export const getAllPayement  = async (token : string) => {
    const res = await axios.get( IP + "/payements" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}


export const getOnePayement  = async (token : string , id : any) => {
    const res = await axios.get( IP + "/payement/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const CreatePayement  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/payements", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdatePayement  = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/payement/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeletePayement  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/payement/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
