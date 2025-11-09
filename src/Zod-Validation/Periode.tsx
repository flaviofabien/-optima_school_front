import z from "zod";

export const PeriodeSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"), 
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"), 
    dateFin: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    idAnneeScolaire: z.string().min(1,"Ce champs est requise 🔺"), 
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"), 
});
export  type FormDataNiveauType = z.infer<typeof PeriodeSchema>;

export const PeriodeEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"), 
    dateFin: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    idAnneeScolaire: z.string().min(1,"Ce champs est requise 🔺"), 
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"), 
});
export  type FormDataNiveauEditType = z.infer<typeof PeriodeEditSchema>;