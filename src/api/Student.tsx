import axios from "axios"
import { IP } from "./IP"

export const getAllStudents  = async (token : string,    
    page : number | undefined,limit : number |undefined , search : string | undefined , order : string | undefined ,sortBy : string | undefined    ) => {
    const res = await axios.get( IP + "/students" , {
        params : { page,limit,search,order,sortBy },
        headers : {
            "Authorization" : "Bearer " + token
        }
        
    })    
    return res.data
}

export const getOneStudents  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/student/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateStudents  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/students", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateStudents  = async (token : string,newUser : FormData,id : string) => {
    const res = await axios.put( IP + "/student/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteStudents  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/student/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
