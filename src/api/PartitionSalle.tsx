import axios from "axios"
import { IP } from "./IP"

export const getAllPartitionSalle  = async (
    token : string,
    ) => {
    const res = await axios.get( IP + "/partition-salles" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })    
    return res.data
}

export const getOnePartitionSalle  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/partition-salle/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreatePartitionSalle  = async (token : string,newUser : any) => {
    const res = await axios.post( IP + "/partition-salles", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdatePartitionSalle  = async (token : string,newUser : any,id : string) => {
    const res = await axios.put( IP + "/partition-salle/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeletePartitionSalle  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/partition-salle/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
