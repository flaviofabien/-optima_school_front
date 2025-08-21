import axios from "axios"
import { IP } from "./IP"
import type { FormDataLoginType } from "../Zod-Validation/Auth"

export const LoginUser  = async (newPatient : FormDataLoginType) => {
    const res = await axios.post(IP+"/login",newPatient)
    return res.data
}