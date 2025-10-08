import z from "zod";

export const studentSchema = z.object({  
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().refine((val) => {
        const digitsOnly = val.replace(/\s+/g, '');

        return /^\d{9,10}$/.test(digitsOnly);
      }, {
        message: "Numéro invalide. Utilisez 03X XX XX XXX ou 34 XX XXX XX",
    }),
    status: z.string().min(1, "Ce champs est requise🔺"),
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().optional(),
    role: z.string().optional(),
});
export  type FormDataStudentType = z.infer<typeof studentSchema>;

export const studentEditSchema = z.object({
    dateNaissance: z.string().min(1, "Ce champs est requise🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().refine((val) => {
        const digitsOnly = val.replace(/\s+/g, '');

        return /^\d{9,10}$/.test(digitsOnly);
      }, {
        message: "Numéro invalide. Utilisez 03X XX XX XXX ou 34 XX XXX XX",
    }),    
    status: z.string().min(1, "Ce champs est requise🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().optional(),
});
export  type FormDataStudentEditType = z.infer<typeof studentEditSchema>;
