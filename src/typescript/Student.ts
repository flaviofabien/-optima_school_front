import type { userType } from "./Users"

export type StudentsType = {
    id: number,
    userId: number,
    matricule: string,
    dateNaissance: string,
    sex: string,
    address: string,
    phone: string,
    classes: string,
    status: string,
    User: userType
}