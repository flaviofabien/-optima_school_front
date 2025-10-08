import z from "zod";

export const NotesSchema = z.object({
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idStudent: z.string().min(1,"Ce champs est requise 🔺"),
    notes : z.custom(),
});

export  type FormDataNotesType = z.infer<typeof NotesSchema>;
