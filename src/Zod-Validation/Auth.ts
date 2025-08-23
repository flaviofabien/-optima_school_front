import z from "zod";


export const loginSchema = z.object({
    password: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    email: z.string().email("Email est invalid 🔺"),
  });

  export const resetPassword = z.object({
    email: z.string().email("Email est invalid 🔺"),
  });
  export const updatePasswordSchema = z.object({
      newPassword: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
      confimationPassword: z.string().min(8, "Mot de passe devrait etre forte 🔺"),
    });
  
export  type FormDataResetPasswordType = z.infer<typeof resetPassword>;
export  type FormDataLoginType = z.infer<typeof loginSchema>;
export  type FormDataupdatePasswordType = z.infer<typeof updatePasswordSchema>;