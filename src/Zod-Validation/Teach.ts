import z from "zod";

export const TeachSchema = z.object({
    userId: z.number().min(1, "Ce champs est requise🔺 🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    specialite: z.string().min(1,"Ce champs est requise 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
});

export  type FormDataTeachType = z.infer<typeof TeachSchema>;

export const TeachEditSchema = z.object({
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    specialite: z.string().min(1,"Ce champs est requise 🔺"),
    status: z.string().min(1, "Ce champs est requise🔺"),
});

export  type FormDataTeachEditType = z.infer<typeof TeachEditSchema>;
