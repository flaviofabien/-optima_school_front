import axios from "axios"
import { IP } from "./IP"

export const getAllUsers  = async (token : string) => {
    const res = await axios.get( IP + "/users" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getAllStudentUsers  = async (token : string) => {
    const res = await axios.get( IP + "/users/student" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getAllTeachUsers  = async (token : string) => {
    const res = await axios.get( IP + "/users/teach" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const getOneUsers  = async (token : string , id : any) => {
    const res = await axios.get( IP + "/user/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const CreateUsers  = async (token : string,newUser : FormData) => {
    const res = await axios.post( IP + "/users", newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const UpdateUsers  = async (token : string,newUser : any,id : any) => {
    const res = await axios.put( IP + "/user/" + id , newUser , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}

export const DeleteUsers  = async ( id : number ,token : string ,) => {
    const res = await axios.delete( IP + "/user/" + id , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}
