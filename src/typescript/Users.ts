export type userType = {
    id : number
    nom : string
    prenom : string
    email : string
    password : string
    role : "admin" | "Enseignant" | "parent" | "élève" | undefined
}