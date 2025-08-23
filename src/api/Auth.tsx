import axios from "axios"
import { IP } from "./IP"
import type { FormDataLoginType, FormDataResetPasswordType, FormDataupdatePasswordType } from "../Zod-Validation/Auth"

export const LoginUser  = async (user : FormDataLoginType) => {
    const res = await axios.post(IP+"/login",user)
    return res.data
}

export const ResetPasswordUser = async (email : FormDataResetPasswordType) => {
    const res = await axios.post(IP+"/reset-password",email)
    return res.data
}

export const UpdatePasswordUser = async (password : FormDataupdatePasswordType) => {
    const res = await axios.post(IP+"/update-password",password)
    return res.data
}