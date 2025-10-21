import axios from "axios"
import { IP } from "./IP"

export const getAllStates  = async (token : string) => {
    const res = await axios.get( IP + "/state" , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data.data
}