import z from "zod";

export const SousPeriodeSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"), 
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"), 
    dateFin: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    idCategorie: z.string().min(1,"Ce champs est requise 🔺"), 
});

export  type FormDataNiveauType = z.infer<typeof SousPeriodeSchema>;

export const SousPeriodeEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"), 
    dateFin: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    idCategorie: z.string().min(1,"Ce champs est requise 🔺"), 
});

export  type FormDataNiveauEditType = z.infer<typeof SousPeriodeEditSchema>;