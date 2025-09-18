import z from "zod";

export const TeachSchema = z.object({
    img: z
    .custom<FileList>((value) => {
      return value instanceof FileList && value.length > 0;
    }, {
      message: "Ce champ est requis 🔺",
    }),    matricule: z.string().min(1, "Ce champs est requise🔺 🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.number().min(8, "Mot de passe devrait etre forte 🔺"),
    specialite: z.string().min(1,"Ce champs est requise 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
});

export  type FormDataTeachType = z.infer<typeof TeachSchema>;

export const TeachEditSchema = z.object({
    img: z
    .custom<FileList>((value) => {
      return value instanceof FileList && value.length > 0;
    }, {
      message: "Ce champ est requis 🔺",
    }),    matricule: z.string().min(1,"Ce champs est requise 🔺"),
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.number().min(8, "Mot de passe devrait etre forte 🔺"),
    specialite: z.string().min(1,"Ce champs est requise 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
});

export  type FormDataTeachEditType = z.infer<typeof TeachEditSchema>;
