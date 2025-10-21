import z from "zod";

export const NiveauSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"), 
});

export  type FormDataNiveauType = z.infer<typeof NiveauSchema>;

export const NiveauEditSchema = z.object({
    nom: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataNiveauEditType = z.infer<typeof NiveauEditSchema>;