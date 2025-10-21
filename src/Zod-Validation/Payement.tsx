import z from "zod";

export const PayementSchema = z.object({
    motif: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    prix: z.number().min(1,"Ce champs est requise 🔺"), 
    idStudent: z.string().optional(), 
    idEcole: z.string().min(1,"Ce champs est requise 🔺"), 
});
export  type FormDataNiveauType = z.infer<typeof PayementSchema>;

export const PayementEditSchema = z.object({
    motif: z.string().min(1,"Ce champs est requise 🔺"), 
    type: z.string().min(1,"Ce champs est requise 🔺"), 
    prix: z.number().min(1,"Ce champs est requise 🔺"), 
    idStudent: z.string().optional(), 
    idEcole: z.string().min(1,"Ce champs est requise 🔺"), 
});
export  type FormDataNiveauEditType = z.infer<typeof PayementEditSchema>;