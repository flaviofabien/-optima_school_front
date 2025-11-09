import z from "zod";

export const AbsenceSchema = z.object({
    motif: z.string().min(1,"Ce champs est requise 🔺"),
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"),
    dateFin: z.string().min(1,"Ce champs est requise 🔺"),
    heurDebut: z.string().optional(),
    heurFin: z.string().optional(),
    idStudent: z.string().min(1,"Ce champs est requise 🔺"),
    
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataAbsenceType = z.infer<typeof AbsenceSchema>;

export const AbsenceEditSchema = z.object({
    motif: z.string().min(1,"Ce champs est requise 🔺"),
    dateDebut: z.string().min(1,"Ce champs est requise 🔺"),
    dateFin: z.string().min(1,"Ce champs est requise 🔺"),
    heurDebut: z.string().optional(),
    heurFin: z.string().optional(),
    idStudent: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataAbsenceEditType = z.infer<typeof AbsenceEditSchema>;