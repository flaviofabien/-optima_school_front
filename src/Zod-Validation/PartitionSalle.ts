import z from "zod";

export const PartitionSalleSchema = z.object({
    idEleves: z.custom().optional(),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idSalle: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
});
export  type FormDataExamenType = z.infer<typeof PartitionSalleSchema>;

export const ExamenEditSchema = z.object({
    idEleves: z.custom().optional(),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idExamen: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
});
export  type FormDataExamenEditType = z.infer<typeof ExamenEditSchema>;