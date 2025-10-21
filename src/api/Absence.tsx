import axios from "axios"
import { IP } from "./IP"

export const getAllAbsence  = async ( token : string,
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined
    ) => {
    const res = await axios.get( IP + "/absences" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })    
    return res.data
}

export const getOneAbsence  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/absence/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateAbsence  = async (token : string,newUser : any) => {
    const res = await axios.post( IP + "/absences", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateAbsence  = async (token : string,newUser : any,id : string) => {
    const res = await axios.put( IP + "/absence/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteAbsence  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/absence/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
