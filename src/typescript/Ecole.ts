
type EcoleType = {
    id : number
    nom: string;
    adresse: string;
    type: string[];
    img: unknown;
}
export type EcoleData = {
    data : EcoleType[]
    totalPages : number
};
