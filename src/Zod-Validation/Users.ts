import z from "zod";

export const userSchema = z.object({
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
  });
export  type FormDataUserType = z.infer<typeof userSchema>;

export const userEditSchema = z.object({
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
  });
export  type FormDataUserEditType = z.infer<typeof userEditSchema>;