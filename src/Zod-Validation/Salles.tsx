import z from "zod";

export const SalleSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    effectif: z.number().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataSalleType = z.infer<typeof SalleSchema>;

export const SalleEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    effectif: z.number().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataSalleEditType = z.infer<typeof SalleEditSchema>;