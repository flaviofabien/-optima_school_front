export type DataStorageUserType = {
    token : string,
    alert : {
        status : boolean,
        message : string
    },
    user : UserDatastorageType
}

export type UserDatastorageType = {
    id : number
    nom : string
    prenom : string
    email : string
    role : "superAdmin" | "admin" | "Enseignant" | "parent" | "élève" | undefined
} 