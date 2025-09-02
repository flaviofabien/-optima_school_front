import axios from "axios"
import { IP } from "./IP"
import type { FormDataMatiereEditType, FormDataMatiereType } from "../Zod-Validation/Matiere"

export const getAllMatieres  = async (token : string) => {
    const res = await axios.get( IP + "/matieres" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getOneMatieres  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/matiere/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateMatieres  = async (token : string,newUser : FormDataMatiereType) => {
    const res = await axios.post( IP + "/matieres", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateMatieres  = async (token : string,newUser : FormDataMatiereEditType,id : string) => {
    const res = await axios.put( IP + "/matiere/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteMatieres  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/matiere/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
