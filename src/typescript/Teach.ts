import type { userType } from "./Users"

export type TeachType = {
    id: number,
    userId: number,
    sex: string,
    specialite: string,
    address: string,
    phone: string,
    classes: string,
    status: string,
    User: userType
}