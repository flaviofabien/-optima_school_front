import z from "zod";

export const ClasseSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.number().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataClasseType = z.infer<typeof ClasseSchema>;

export const ClasseEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.number().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataClasseEditType = z.infer<typeof ClasseEditSchema>;