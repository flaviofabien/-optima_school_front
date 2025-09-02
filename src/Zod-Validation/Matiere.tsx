import z from "zod";

export const MatiereSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    coefficiant: z.number().min(1,"Ce champs est requise 🔺"),
    idClasse: z.number().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataMatiereType = z.infer<typeof MatiereSchema>;

export const MatiereEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    coefficiant: z.number().min(1,"Ce champs est requise 🔺"),
    idClasse: z.number().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataMatiereEditType = z.infer<typeof MatiereEditSchema>;