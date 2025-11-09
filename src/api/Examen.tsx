import axios from "axios"
import { IP } from "./IP"

export const getAllExamens  = async (
    token : string,
    ) => {
    const res = await axios.get( IP + "/examens" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
        
    })    
    return res.data
}

export const getAllStudentExtendExamen  = async (
    token : string,
    ) => {
    const res = await axios.get( IP + "/students-examen" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
        
    })    
    return res.data
}

export const getOneExamens  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/examen/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateExamens  = async (token : string,newUser : any) => {
    const res = await axios.post( IP + "/examens", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateExamens  = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/examen/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteExamens  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/examen/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
