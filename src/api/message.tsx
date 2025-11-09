import axios from "axios"
import { IP } from "./IP"

export const getAllMessage  = async (token : string,user1 : any , user2 : any) => {
    const res = await axios.get( IP + "/message/" + user1 +  "/" + user2 , {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return res.data
}
