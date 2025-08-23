export type DataStorageUserType = {
    token : string,
    alert : boolean,
    user : UserDatastorageType
}

export type UserDatastorageType = {
    id : number
    nom : string
    prenom : string
    email : string
    role : "admin" | "Enseignant" | "parent" | "élève" | undefined
} 