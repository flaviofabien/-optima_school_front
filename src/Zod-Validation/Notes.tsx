import z from "zod";

export const NotesSchema  = z.object({
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idStudent: z.string().min(1,"Ce champs est requise 🔺"),
    idCategorie: z.string().min(1,"Ce champs est requise 🔺"),
    note: z.number().min(0, "La note ne peut pas être inférieure à 0"),
    idSalle: z.string().min(1,"Ce champs est requise 🔺"),
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
})

export  type FormDataNotesType = z.infer<typeof NotesSchema>;

export const NotesSchemaEdit  = z.object({
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idStudent: z.string().min(1,"Ce champs est requise 🔺"),
    idCategorie: z.string().min(1,"Ce champs est requise 🔺"),
    note: z.number().min(0, "La note ne peut pas être inférieure à 0"),
    idSalle: z.string().min(1,"Ce champs est requise 🔺"),
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
})

export  type FormDataNotesEditType = z.infer<typeof NotesSchemaEdit>;