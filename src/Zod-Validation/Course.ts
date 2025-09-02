import z from "zod";

export const CoursesSchema = z.object({
    idSalle: z.number().min(1,"Ce champs est requise 🔺"),
    idTeacher: z.number().min(1, "Ce champs est requise🔺"),
    idMatiere: z.number().min(1,"Ce champs est requise 🔺"),
    eleveIds: z.custom(),
    jour: z.string().min(1, "Ce champs est requise🔺"),
    heureDebut: z.number().min(1, "Ce champs est requise🔺"),
    heureFin: z.number().min(1, "Ce champs est requise🔺"),

});
export  type FormDataCoursesType = z.infer<typeof CoursesSchema>;

export const CoursesEditSchema = z.object({
    idSalle: z.number().min(1,"Ce champs est requise 🔺"),
    idTeacher: z.number().min(1, "Ce champs est requise🔺"),
    idMatiere: z.number().min(1,"Ce champs est requise 🔺"),
    eleveIds: z.custom(),
    jour: z.string().min(1, "Ce champs est requise🔺"),
    heureDebut: z.number().min(1, "Ce champs est requise🔺"),
    heureFin: z.number().min(1, "Ce champs est requise🔺"),
});
export  type FormDataCoursesEditType = z.infer<typeof CoursesEditSchema>;
