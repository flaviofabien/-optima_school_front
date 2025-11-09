import axios from "axios"
import { IP } from "./IP"

export const getAllMatieres  = async ( token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/matieres" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })    
    return res.data
}

export const getOneMatieres  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/matiere/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateMatieres  = async (token : string,newUser : any) => {
    const res = await axios.post( IP + "/matieres", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateMatieres  = async (token : string,newUser : any,id : string) => {
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
