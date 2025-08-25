import axios from "axios"
import { IP } from "./IP"
import type { FormDataStudentType } from "../Zod-Validation/Students"
import type { FormDataTeachEditType } from "../Zod-Validation/Teach"

export const getAllStudents  = async (token : string) => {
    const res = await axios.get( IP + "/students" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data.rows
}

export const getOneStudents  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/student/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateStudents  = async (token : string,newUser : FormDataStudentType) => {
    const res = await axios.post( IP + "/students", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateStudents  = async (token : string,newUser : FormDataTeachEditType,id : string) => {
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
