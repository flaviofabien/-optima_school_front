import z from "zod";

export const AnneeScolaireSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"), 
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"), 
    dateFin: z.string().min(1,"Ce champs est requise 🔺"), 
    idEcole: z.string().min(1,"Ce champs est requise 🔺"), 
});

export  type FormDataAnneeScolaireType = z.infer<typeof AnneeScolaireSchema>;

export const AnneeScolaireEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"),
    dateFin: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataAnneeScolaireEditType = z.infer<typeof AnneeScolaireEditSchema>;