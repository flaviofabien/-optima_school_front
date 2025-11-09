import z from "zod";

export const TeachSchema = z.object({ 
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().refine((val) => {
      const digitsOnly = val.replace(/\s+/g, '');

      return /^\d{9,10}$/.test(digitsOnly);
    }, {
      message: "Numéro invalide. Utilisez 03X XX XX XXX ou 34 XX XXX XX",
  }),    specialite: z.string().min(1,"Ce champs est requise 🔺"),
    email: z.string().email("Email est invalid 🔺"),
    nom: z.string().min(1, "Ce champs est requise🔺"),
    prenom: z.string().min(1,"Ce champs est requise 🔺"),
    
    /* */
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
    
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
    role: z.string().optional(),
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
});

export  type FormDataTeachType = z.infer<typeof TeachSchema>;

export const TeachEditSchema = z.object({ 
    sex: z.string().min(1,"Ce champs est requise 🔺"),
    address: z.string().min(1,"Ce champs est requise 🔺"),
    phone: z.string().refine((val) => {
      const digitsOnly = val.replace(/\s+/g, '');

      return /^\d{9,10}$/.test(digitsOnly);
    }, {
      message: "Numéro invalide. Utilisez 03X XX XX XXX ou 34 XX XXX XX",
  }),    specialite: z.string().min(1,"Ce champs est requise 🔺"),    
    /* */
    idClasse: z.string().min(1,"Ce champs est requise 🔺"),
    idNiveau: z.string().min(1,"Ce champs est requise 🔺"),
    idEcole: z.string().min(1,"Ce champs est requise 🔺"),
  
    idMatiere: z.string().min(1,"Ce champs est requise 🔺"),
});

export  type FormDataTeachEditType = z.infer<typeof TeachEditSchema>;
