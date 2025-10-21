import z from "zod";

export const EcoleSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    adresse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveaux: z.string().array(),
});

export  type FormDataEcoleType = z.infer<typeof EcoleSchema>;

export const EcoleEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
    adresse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveaux: z.string().array(),
});

export  type FormDataEcoleEditType = z.infer<typeof EcoleEditSchema>;
