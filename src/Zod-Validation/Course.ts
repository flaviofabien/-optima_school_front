import z from "zod";

export const CoursesSchema = z.object({
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idSalle: z.string().min(1,"Ce champs est requise 🔺"),
    idTeacher: z.string().min(1, "Ce champs est requise🔺"),
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
    jour: z.string().min(1, "Ce champs est requise🔺"),
    heureDebut: z.string().min(1, "Ce champs est requise🔺"),
    heureFin: z.string().min(1, "Ce champs est requise🔺"),
});
export  type FormDataCoursesType = z.infer<typeof CoursesSchema>;

export const CoursesEditSchema = z.object({
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idSalle: z.string().min(1,"Ce champs est requise 🔺"),
    idTeacher: z.string().min(1, "Ce champs est requise🔺"),
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
    jour: z.string().min(1, "Ce champs est requise🔺"),
    heureDebut: z.string().min(1, "Ce champs est requise🔺"),
    heureFin: z.string().min(1, "Ce champs est requise🔺"),
});
export  type FormDataCoursesEditType = z.infer<typeof CoursesEditSchema>;
