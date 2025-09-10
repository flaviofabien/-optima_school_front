import z from "zod";

export const studentSchema = z.object({
    img: z.custom(),
    matricule: z.string().min(1,"Ce champs est requise 🔺"),
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.number().min(8, "Mot de passe devrait etre forte 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
});
export  type FormDataStudentType = z.infer<typeof studentSchema>;

export const studentEditSchema = z.object({
    img: z.custom(),
    matricule: z.string().min(1,"Ce champs est requise 🔺"),
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.number().min(8, "Mot de passe devrait etre forte 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
});
export  type FormDataStudentEditType = z.infer<typeof studentEditSchema>;
