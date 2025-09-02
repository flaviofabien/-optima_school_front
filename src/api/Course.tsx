import axios from "axios"
import { IP } from "./IP"
import type { FormDataCoursesEditType } from "../Zod-Validation/Course"

export const getAllCourses  = async (token : string) => {
    const res = await axios.get( IP + "/courses" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
export const getAllExamen  = async (token : string,idClasse : number) => {
    const res = await axios.get( IP + "/partition-examen" , {
        params : {
            idClasse
        },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getOneCourses  = async (token : string , id : string) => {
    const res = await axios.get( IP + "/course/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateCourses  = async (token : string,newUser : FormDataCoursesEditType) => {
    const res = await axios.post( IP + "/courses", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateCourses  = async (token : string,newUser : FormDataCoursesEditType,id : string) => {
    const res = await axios.put( IP + "/course/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteCourses  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/course/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
