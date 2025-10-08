import axios from "axios"
import { IP } from "./IP"

export const getAllAnneeScolaire = async (token : string) => {
    const res = await axios.get( IP + "/annee-scolaires" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}


export const getOneAnneeScolaire = async (token : string , id : any) => {
    const res = await axios.get( IP + "/annee-scolaire/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}

export const CreateAnneeScolaire = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/annee-scolaires", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateAnneeScolaire = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/annee-scolaire/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteAnneeScolaire = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/annee-scolaire/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
