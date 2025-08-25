import z from "zod";

export const studentSchema = z.object({
    userId: z.number().min(1, "Ce champs est requise🔺 🔺"),
    matricule: z.string().min(1,"Ce champs est requise 🔺"),
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    classes: z.string().min(1,"Ce champs est requise 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
});

export  type FormDataStudentType = z.infer<typeof studentSchema>;

export const studentEditSchema = z.object({
    matricule: z.string().min(1,"Ce champs est requise 🔺"),
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    classes: z.string().min(1,"Ce champs est requise 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
});

export  type FormDataStudentEditType = z.infer<typeof studentEditSchema>;
